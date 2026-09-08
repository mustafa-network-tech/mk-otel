export type SearchInput={checkIn:string;checkOut:string;adults:number;children:number};
export type AvailableRoom={id:number;roomType:string;slug:string;description:string;capacityAdults:number;capacityChildren:number;basePrice:number;images:string[];features:string[];totalRooms:number;availableRooms:number;nights:number;totalAmount:number};
export type BookingGuest={firstName:string;lastName:string;phone:string;email:string;notes?:string};
export type CreateBookingInput=SearchInput&BookingGuest&{roomTypeId:number};
export type BookingConfirmation={reservationNumber:string;status:'PENDING'|'CONFIRMED';roomType:string;checkIn:string;checkOut:string;nights:number;adults:number;children:number;totalAmount:number};
