'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle } from '@phosphor-icons/react';
import { images } from '@/data/images';
import { contactHref } from '@/data/site';

const trust = ['Bolu Merkez', 'Doğa Rotalarına Yakın', 'Hızlı Rezervasyon'];

export function Hero() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % images.heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return <section id="ana-sayfa" className="hero cinematic-hero">
    <div className="hero-scenes" aria-hidden="true">
      {images.heroSlides.map((slide, index) => <div className={`hero-scene ${index === active ? 'active' : ''}`} key={slide.src}>
        <Image src={slide.src} alt="" fill priority={index === 0} sizes="100vw" />
      </div>)}
    </div>
    <div className="hero-shade" />
    <div className="hero-copy">
      <span className="eyebrow light">Doğanın merkezinde · Bolu</span>
      <h1>Bolu’yu Sadece Gezme.<br/><em>Doğayı Yaşa.</em></h1>
      <p>Şehrin merkezinde; Abant’a, Yedigöller’e ve yemyeşil yaylalara uzanan modern bir konaklama deneyimi.</p>
      <div className="actions">
        <a className="btn white" href="#odalar">Odaları Keşfet <ArrowDown /></a>
        <a className="btn glass" href="#rezervasyon">Rezervasyon Yap <ArrowUpRight /></a>
      </div>
      <div className="hero-trust">{trust.map(item => <span key={item}><CheckCircle weight="fill" />{item}</span>)}</div>
    </div>
    <div className="hero-pagination">{images.heroSlides.map((slide, index) => <button key={slide.label} onClick={() => setActive(index)} className={index === active ? 'active' : ''} aria-label={`${slide.label} görselini göster`}><i /><span>0{index + 1}</span><b>{slide.label}</b></button>)}</div>
  </section>;
}
