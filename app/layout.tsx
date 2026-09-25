import type { Metadata } from 'next'; import './globals.css'; import {DemoBar} from '@/components/DemoBar';
const title='Mavi Kadraj Otel — Otel Web Sitesi Demosu | MK Digital Systems';
const description="MK Digital Systems'in otel ve pansiyon işletmeleri için hazırladığı örnek web sitesi: oda sayfaları, galeri ve çevrim içi rezervasyon akışı. Mavi Kadraj Otel gerçek bir işletme değildir.";
// Demo site: kept out of search results so it is never mistaken for a real hotel. X-Robots-Tag in next.config.ts covers non-HTML responses too.
export const metadata: Metadata={title,description,robots:{index:false,follow:false,googleBot:{index:false,follow:false}},openGraph:{title:'Mavi Kadraj Otel · Otel web sitesi demosu',description:"Otel ve pansiyonlar için hazırlanmış örnek web sitesi ve rezervasyon akışı. MK Digital Systems portföy projesi.",type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body><DemoBar/>{children}</body></html>}
