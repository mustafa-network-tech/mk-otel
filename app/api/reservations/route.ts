import {NextResponse} from 'next/server';import {createReservation} from '@/lib/booking-service';
export const runtime='nodejs';export async function POST(request:Request){try{return NextResponse.json(createReservation(await request.json()),{status:201});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Rezervasyon oluşturulamadı.'},{status:409})}}
