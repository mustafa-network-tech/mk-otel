import type {SearchInput} from './booking-types';
export function dateOnly(value:string){return /^\d{4}-\d{2}-\d{2}$/.test(value)}
export function nightsBetween(checkIn:string,checkOut:string){return Math.round((Date.parse(`${checkOut}T00:00:00Z`)-Date.parse(`${checkIn}T00:00:00Z`))/86400000)}
export function validateSearch(input:SearchInput){
  if(!dateOnly(input.checkIn)||!dateOnly(input.checkOut))throw new Error('Geçerli giriş ve çıkış tarihleri seçin.');
  const today=new Date();today.setHours(0,0,0,0);if(Date.parse(`${input.checkIn}T00:00:00`)<today.getTime())throw new Error('Geçmiş bir tarih seçilemez.');
  const nights=nightsBetween(input.checkIn,input.checkOut);if(nights<1)throw new Error('Çıkış tarihi giriş tarihinden sonra olmalıdır.');
  if(!Number.isInteger(input.adults)||input.adults<1||input.adults>8)throw new Error('Yetişkin sayısı 1–8 arasında olmalıdır.');
  if(!Number.isInteger(input.children)||input.children<0||input.children>6)throw new Error('Çocuk sayısı 0–6 arasında olmalıdır.');return nights;
}
