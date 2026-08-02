export const site = {
  name: 'Baba Loknath Communication',
  tagline: 'Your Trusted Travel & Digital Service Center',
  phone: '+91 97323 67890',
  phoneHref: 'tel:+919732367890',
  whatsapp: '+91 97323 67890',
  whatsappHref:
    'https://wa.me/919732367890?text=Hello%20Baba%20Loknath%20Communication%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.',
  email: 'blcslg13@gmail.com',
  emailHref: 'https://mail.google.com/mail/?view=cm&fs=1&to=blcslg13@gmail.com',
  address: '24, Bimal Sinha Sarani, Hakim Para, Siliguri, West Bengal',
  hours: 'Mon – Sun: 7:30 AM – 11:30 PM',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.6!2d88.42920!3d26.71545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4416d11743705%3A0x7114c027dc33aeca!2sBaba%20Lokenath%20Communication!5e0!3m2!1sen!2sin!4v1753650000000!5m2!1sen!2sin',
} as const

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services', hasDropdown: true },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact Us', href: '#contact' },
] as const
