type Locale = 'id' | 'en';

const translations = {
  id: {
    nav: { about: 'Tentang', services: 'Layanan', contact: 'Kontak', home: 'Beranda' },
    hero: {
      badge: 'Franchise & Kemitraan Terpercaya',
      cta_primary: 'Mulai Bermitra',
      cta_secondary: 'Pelajari Lebih Lanjut',
      scroll: 'Gulir ke bawah',
      trusted: 'Terpercaya & Berpengalaman',
      since: 'Sejak 2020',
    },
    about: {
      label: 'Tentang Kami',
      why_partner: 'Mengapa Bermitra?',
    },
    services: {
      label: 'Layanan Kami',
      visit: 'Kunjungi Layanan',
      coming_soon: 'Segera Hadir',
    },
    contact: {
      label: 'Hubungi Kami',
      name: 'Nama Lengkap',
      email: 'Email',
      subject: 'Subjek',
      message: 'Pesan',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
      quick_chat: 'Chat via WhatsApp',
      phone: 'Telepon',
      address: 'Alamat',
    },
    footer: {
      services: 'Layanan',
      company: 'Perusahaan',
      about: 'Tentang Kami',
      contact: 'Kontak',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat & Ketentuan',
    },
  },
  en: {
    nav: { about: 'About', services: 'Services', contact: 'Contact', home: 'Home' },
    hero: {
      badge: 'Trusted Franchise & Partnership',
      cta_primary: 'Start Partnership',
      cta_secondary: 'Learn More',
      scroll: 'Scroll down',
      trusted: 'Trusted & Experienced',
      since: 'Since 2020',
    },
    about: {
      label: 'About Us',
      why_partner: 'Why Partner?',
    },
    services: {
      label: 'Our Services',
      visit: 'Visit Service',
      coming_soon: 'Coming Soon',
    },
    contact: {
      label: 'Contact Us',
      name: 'Full Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      quick_chat: 'Chat via WhatsApp',
      phone: 'Phone',
      address: 'Address',
    },
    footer: {
      services: 'Services',
      company: 'Company',
      about: 'About Us',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
  },
};

export function useTranslation() {
  const locale: Locale = (typeof window !== 'undefined'
    ? (localStorage.getItem('locale') as Locale) || 'id'
    : 'id');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    window.location.reload();
  };

  return { t, locale, setLocale };
}
