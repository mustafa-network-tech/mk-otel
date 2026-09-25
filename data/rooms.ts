import { images } from './images';
/** Single source for room cards, room pages and the booking database seed. basePrice is in kuruş. */
export const rooms = [
 {slug:'deluxe-orman',name:'Deluxe Orman Oda',capacityAdults:2,capacityChildren:1,totalRooms:4,basePrice:250000,image:images.rooms[0],description:'Doğal dokular ve sakin orman tonlarıyla, şehrin ritminden sonra dinlenebileceğiniz ferah bir oda.',features:['Klima','Yüksek hızlı Wi‑Fi','Özel banyo','Kahvaltı']},
 {slug:'superior-aile',name:'Superior Aile Odası',capacityAdults:3,capacityChildren:2,totalRooms:3,basePrice:340000,image:images.rooms[1],description:'Bolu’yu ailece keşfederken herkes için rahatlık sunan geniş ve işlevsel bir yaşam alanı.',features:['Klima','Yüksek hızlı Wi‑Fi','Özel banyo','Oturma alanı']},
 {slug:'mavi-kadraj-suit',name:'Mavi Kadraj Suit',capacityAdults:2,capacityChildren:2,totalRooms:2,basePrice:420000,image:images.rooms[2],description:'Bolu doğasından ilham alan, ayrı dinlenme alanına sahip özel bir suit.',features:['Klima','Yüksek hızlı Wi‑Fi','Özel banyo','Mini bar']}
].map(r=>({...r,capacity:`${r.capacityAdults} Yetişkin${r.capacityChildren?` + ${r.capacityChildren} Çocuk`:''}`}));
