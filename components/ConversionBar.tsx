'use client';
import { CalendarCheck, WhatsappLogo } from '@phosphor-icons/react';
import { contactHref } from '@/data/site';
export function ConversionBar(){return <><a className="floating-whatsapp" href={contactHref('whatsapp')} aria-label="WhatsApp ile yardım al"><WhatsappLogo weight="fill"/></a><div className="mobile-cta"><a href="#odalar"><CalendarCheck/> Odaları Gör</a><a href="#rezervasyon"><CalendarCheck/> Rezervasyon Yap</a></div></>}
