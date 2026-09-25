import {getDb} from './db';
import type {AvailableRoom,CreateBookingInput,BookingConfirmation,SearchInput} from './booking-types';
import {calculateTotal} from './pricing';
import {validateSearch} from './validation';
import {siteConfig} from '@/data/site';

type RoomRow={id:number;room_type:string;slug:string;description:string;capacity_adults:number;capacity_children:number;base_price:number;images:string;features:string;total_rooms:number;available_rooms:number};
const availabilitySql=`SELECT rt.*,COUNT(r.id) available_rooms FROM room_types rt JOIN rooms r ON r.room_type_id=rt.id AND r.active=1 WHERE rt.active=1 AND rt.capacity_adults>=@adults AND rt.capacity_children>=@children AND NOT EXISTS(SELECT 1 FROM reservations x WHERE x.room_id=r.id AND x.status IN ('PENDING','CONFIRMED') AND x.check_in<@checkOut AND x.check_out>@checkIn) AND NOT EXISTS(SELECT 1 FROM blocked_dates b WHERE (b.room_id=r.id OR (b.room_id IS NULL AND b.room_type_id=rt.id)) AND b.start_date<@checkOut AND b.end_date>@checkIn) GROUP BY rt.id HAVING available_rooms>0 ORDER BY rt.base_price`;

export function searchAvailability(input:SearchInput):AvailableRoom[]{
  const db=getDb();
  const nights=validateSearch(input);
  return (db.prepare(availabilitySql).all(input) as RoomRow[]).map(r=>({id:r.id,roomType:r.room_type,slug:r.slug,description:r.description,capacityAdults:r.capacity_adults,capacityChildren:r.capacity_children,basePrice:r.base_price,images:JSON.parse(r.images),features:JSON.parse(r.features),totalRooms:r.total_rooms,availableRooms:r.available_rooms,nights,totalAmount:calculateTotal({basePrice:r.base_price,checkIn:input.checkIn,checkOut:input.checkOut},nights)}));
}

function reservationNumber(){
  const db=getDb();
  const year=new Date().getFullYear();
  if(siteConfig.demo) return `DEMO-${year}-${String(Math.floor(Math.random()*90000)+10000)}`;
  for(let i=0;i<8;i++){
    const code=`MK-${year}-${String(Math.floor(Math.random()*90000)+10000)}`;
    if(!db.prepare('SELECT 1 FROM reservations WHERE reservation_number=?').get(code)) return code;
  }
  throw new Error('Rezervasyon numarası oluşturulamadı.');
}

export function createReservation(input:CreateBookingInput):BookingConfirmation{
  const db=getDb();
  return db.transaction((payload:CreateBookingInput):BookingConfirmation=>{
    const nights=validateSearch(payload);
    if(!payload.firstName.trim()||!payload.lastName.trim()||!payload.phone.trim()||!/^\S+@\S+\.\S+$/.test(payload.email)) throw new Error('Misafir bilgilerini eksiksiz ve geçerli girin.');
    const rt=db.prepare('SELECT * FROM room_types WHERE id=? AND active=1 AND capacity_adults>=? AND capacity_children>=?').get(payload.roomTypeId,payload.adults,payload.children) as RoomRow|undefined;
    if(!rt) throw new Error('Seçilen oda misafir kapasitesine uygun değil.');
    const room=db.prepare(`SELECT r.id FROM rooms r WHERE r.room_type_id=? AND r.active=1 AND NOT EXISTS(SELECT 1 FROM reservations x WHERE x.room_id=r.id AND x.status IN ('PENDING','CONFIRMED') AND x.check_in<? AND x.check_out>?) AND NOT EXISTS(SELECT 1 FROM blocked_dates b WHERE (b.room_id=r.id OR (b.room_id IS NULL AND b.room_type_id=?)) AND b.start_date<? AND b.end_date>?) ORDER BY r.id LIMIT 1`).get(payload.roomTypeId,payload.checkOut,payload.checkIn,payload.roomTypeId,payload.checkOut,payload.checkIn) as {id:number}|undefined;
    if(!room) throw new Error('Bu oda az önce doldu. Lütfen uygun odaları yeniden arayın.');
    const totalAmount=calculateTotal({basePrice:rt.base_price,checkIn:payload.checkIn,checkOut:payload.checkOut},nights);
    const number=reservationNumber();
    // Demo mode runs the full validation and availability check but stores nothing: no guest data, no blocked inventory.
    if(siteConfig.demo) return{reservationNumber:number,status:'PENDING',roomType:rt.room_type,checkIn:payload.checkIn,checkOut:payload.checkOut,nights,adults:payload.adults,children:payload.children,totalAmount};
    const result=db.prepare(`INSERT INTO reservations(reservation_number,room_type_id,room_id,check_in,check_out,adults,children,status,payment_status,total_amount,notes) VALUES(?,?,?,?,?,?,?,'PENDING','UNPAID',?,?)`).run(number,payload.roomTypeId,room.id,payload.checkIn,payload.checkOut,payload.adults,payload.children,totalAmount,payload.notes?.trim()||null);
    db.prepare('INSERT INTO reservation_guests(reservation_id,first_name,last_name,phone,email) VALUES(?,?,?,?,?)').run(result.lastInsertRowid,payload.firstName.trim(),payload.lastName.trim(),payload.phone.trim(),payload.email.trim().toLowerCase());
    return{reservationNumber:number,status:'PENDING',roomType:rt.room_type,checkIn:payload.checkIn,checkOut:payload.checkOut,nights,adults:payload.adults,children:payload.children,totalAmount};
  })(input);
}
