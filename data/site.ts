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
  distances: [
    { value: '≈ 15 dk', label: 'Gölcük Tabiat Parkı' },
    { value: '≈ 35 km', label: 'Abant Gölü' },
    { value: 'Merkez', label: "Bolu'nun Kalbi" },
    { value: 'Doğa', label: 'Yaylalar & Göller' },
  ],
} as const;

export const contactHref = (kind: 'phone' | 'whatsapp' | 'instagram' | 'maps') => ({
  phone: siteConfig.phoneUrl, whatsapp: siteConfig.whatsapp,
  instagram: siteConfig.instagram, maps: siteConfig.googleMapsUrl,
})[kind] || '#iletisim';
