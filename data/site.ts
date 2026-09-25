/** Portfolio demo identity. Replace this single object when adapting the theme for a client. */
export const siteConfig = {
  brandName: 'Mavi Kadraj Otel',
  location: 'Bolu Merkez',
  phone: '',
  phoneUrl: '',
  whatsapp: '',
  instagram: '',
  address: 'Bolu Merkez, Bolu',
  googleMapsUrl: '',
  developerName: 'MK Digital Systems',
  /** Demo mode: shows the sample-project notice and never stores guest data. Set to false for a real client. */
  demo: true,
  // Switch to https://mk-digitalsystems.com once the new domain is live.
  developerUrl: 'https://mk-digital-systems-seven.vercel.app',
  developerProjectId: 'mavi-kadraj-otel',
  distances: [
    { value: '≈ 15 dk', label: 'Gölcük Tabiat Parkı' },
    { value: '≈ 35 km', label: 'Abant Gölü' },
    { value: 'Merkez', label: "Bolu'nun Kalbi" },
    { value: 'Doğa', label: 'Yaylalar & Göller' },
  ],
};

export const contactHref = (kind: 'phone' | 'whatsapp' | 'instagram' | 'maps') => ({
  phone: siteConfig.phoneUrl, whatsapp: siteConfig.whatsapp,
  instagram: siteConfig.instagram, maps: siteConfig.googleMapsUrl,
})[kind] || '#iletisim';

/** True when the contact channel has a real value; empty channels are hidden instead of linking nowhere. */
export const hasContact = (kind: 'phone' | 'whatsapp' | 'instagram' | 'maps') => contactHref(kind) !== '#iletisim';

/** home: the generic MK signature; project: contextual "Bu projeyi inceleyin"; contact: MK WhatsApp naming this demo. */
export const developerLinks = {
  home: `${siteConfig.developerUrl}/tr`,
  project: `${siteConfig.developerUrl}/tr/work#${siteConfig.developerProjectId}`,
  contact: `https://wa.me/905456597551?text=${encodeURIComponent(`Merhaba MK Digital Systems, ${siteConfig.brandName} demo sitesini inceledim. İşletmem için benzer bir otel web sitesi ve rezervasyon akışı hakkında görüşmek istiyorum.`)}`,
};

/** Google Maps search for a public place (not the hotel's own location). */
export const placeMapHref = (place: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, Bolu`)}`;
