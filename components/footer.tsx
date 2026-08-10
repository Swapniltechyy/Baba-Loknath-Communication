import {
  Mail, MapPin, Phone, Send, Clock, ExternalLink,
  TrainFront, Plane, Bus, Car, Monitor, Printer, Copy, Layers, Package, Edit, CreditCard,
  Home, Info, Briefcase, Star, Users, CheckCircle, Map
} from 'lucide-react'

const WhatsApp = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const quickLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact Us', href: '/#contact' },
]

const ourServices = [
  { label: 'Train Ticket Booking', href: 'https://wa.me/919732367890?text=Hi%2C%20I%20am%20interested%20in%20Train%20Ticket%20Booking' },
  { label: 'Flight Ticket Booking', href: 'https://wa.me/918436112345?text=Hi%2C%20I%20am%20interested%20in%20Flight%20Ticket%20Booking' },
  { label: 'Bus Ticket Booking', href: 'https://wa.me/918436112345?text=Hi%2C%20I%20am%20interested%20in%20Bus%20Ticket%20Booking' },
  { label: 'Hotel Booking', href: 'https://wa.me/919732367890?text=Hi%2C%20I%20am%20interested%20in%20Hotel%20Booking' },
  { label: 'Car Rental', href: 'https://wa.me/919732367890?text=Hi%2C%20I%20am%20interested%20in%20Car%20Rental' },
  { label: 'Courier Services', href: 'https://wa.me/919732367890?text=Hi%2C%20I%20am%20interested%20in%20Courier%20Services' },
  { label: 'Cyber Cafe Services', href: 'https://wa.me/919733367890?text=Hi%2C%20I%20am%20interested%20in%20Cyber%20Cafe%20Services' },
]

const socials = [
  { icon: WhatsApp, label: 'WhatsApp', href: 'https://wa.me/919732367890' },
  { icon: Send, label: 'Telegram', href: 'https://t.me/+919732367890' },
]

const MobileFooter = () => {
  return (
    <footer className="md:hidden bg-[#0F4C81] text-white">
      <div className="h-[2px] w-full bg-gradient-to-b from-white/10 to-transparent" />
      <div className="flex flex-col gap-5 px-5 py-5">

        {/* SECTION 1: LOGO & INTRO */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Baba Loknath Communication" className="h-12 w-auto" />
            <h2 className="text-[17px] font-bold tracking-tight whitespace-nowrap">
              Baba Loknath <span className="text-[#F59E0B]">Communication</span>
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-semibold text-white/95">Trusted Travel & Digital Services</p>
            <p className="text-[13px] text-white/70">Serving Since 1999</p>
          </div>
          <p className="text-[15px] leading-relaxed text-white/80 max-w-[280px]">
            Your trusted destination for travel bookings and digital services.
          </p>
        </div>

        {/* SECTION 2: DEPARTMENT CONTACTS */}
        <div className="flex flex-col gap-5">
          <h3 className="font-heading text-[13px] font-bold tracking-widest text-white/50 uppercase">Department Contacts</h3>

          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="flex flex-col gap-5 rounded-2xl bg-[#0C3F6B] p-6 shadow-xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <TrainFront className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3">
                <TrainFront className="h-[22px] w-[22px] text-[#F59E0B]" />
                <h4 className="text-[17px] font-bold text-white">Train Booking</h4>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <a href="tel:+919832067890" className="text-[15px] font-bold text-white tracking-wide transition-colors hover:text-white/80">+91 98320 67890</a>
                    <a href="tel:+919733367890" className="text-[15px] font-bold text-white tracking-wide transition-colors hover:text-white/80 mt-2">+91 97333 67890</a>
                  </div>
                </div>

                <a href="https://wa.me/919732367890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/20">
                    <WhatsApp className="h-[18px] w-[18px] text-[#25D366]" />
                  </div>
                  <span className="text-[15px] font-bold text-white tracking-wide">+91 97323 67890</span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-5 rounded-2xl bg-[#0C3F6B] p-6 shadow-xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                <Plane className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3">
                <Plane className="h-[22px] w-[22px] text-[#F59E0B]" />
                <h4 className="text-[17px] font-bold text-white">Bus & Flight Booking</h4>
              </div>

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <a href="tel:+917076212345" className="text-[15px] font-bold text-white tracking-wide transition-colors hover:text-white/80">+91 70762 12345</a>
                    <a href="tel:+917076312345" className="text-[15px] font-bold text-white tracking-wide transition-colors hover:text-white/80 mt-2">+91 70763 12345</a>
                  </div>
                </div>

                <a href="https://wa.me/918436112345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/20">
                    <WhatsApp className="h-[18px] w-[18px] text-[#25D366]" />
                  </div>
                  <span className="text-[15px] font-bold text-white tracking-wide">+91 84361 12345</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: CONTACT INFORMATION */}
        <div className="flex flex-col gap-5">
          <h3 className="font-heading text-[13px] font-bold tracking-widest text-white/50 uppercase">Contact Information</h3>
          <div className="flex flex-col gap-5 rounded-2xl bg-[#0C3F6B] p-6 shadow-xl border border-white/5">
            <a href="https://www.google.com/maps/search/?api=1&query=24,+Bimal+Sinha+Sarani,+Hakim+Para,+Siliguri,+West+Bengal" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 transition-opacity hover:opacity-80">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Address</span>
                <span className="text-[15px] font-medium leading-relaxed text-white">24, Bimal Sinha Sarani,<br />Hakim Para, Siliguri,<br />West Bengal – 734001</span>
              </div>
            </a>
            <div className="h-px w-full bg-white/10" />
            <a href="tel:+919732367890" className="flex items-start gap-4 transition-opacity hover:opacity-80">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Main Contact</span>
                <span className="text-[16px] font-bold text-white tracking-wide">+91 97323 67890</span>
              </div>
            </a>
            <div className="h-px w-full bg-white/10" />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=blcslg13@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 transition-opacity hover:opacity-80">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Email</span>
                <span className="text-[15px] font-medium text-white">blcslg13@gmail.com</span>
              </div>
            </a>
            <div className="h-px w-full bg-white/10" />
            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-[#F59E0B]" />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Business Hours</span>
                <span className="text-[15px] font-medium text-white">Mon – Sun</span>
                <span className="text-[15px] font-medium text-white">8:00 AM – 11:30 PM</span>
              </div>
            </div>
          </div>
        </div>



        {/* SECTION 7: COPYRIGHT */}
        <div className="border-t border-white/10 mt-4 pt-8 text-center flex flex-col gap-2">
          <p className="text-[13px] text-white/50 font-medium tracking-wide">© 2026 Baba Loknath Communication</p>
          {/* <p className="text-[12px] text-white/40">All Rights Reserved.</p> */}
          <p className="text-[12px] text-white/40 mt-1">Designed & Developed By <a href="https://www.swapniltech.com/#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SWAPNIL</a></p>
        </div>

      </div>
    </footer>
  )
}

export function Footer() {
  return (
    <>
      <footer className="hidden md:block bg-[#0b3c5d] text-white">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:flex lg:justify-between lg:gap-8">

            {/* Brand & About */}
            <div className="flex flex-col gap-6 lg:max-w-[280px]">
              <a href="#" className="flex items-center gap-2.5">
                <img src="/logo.png" alt="Baba Loknath Communication" className="h-12 w-auto" />
                <span className="flex flex-col leading-none">
                  <span className="text-s font-bold tracking-tight text-white">
                    Baba Loknath
                  </span>
                  <span className="text-s font-semibold text-brand-orange">
                    Communication
                  </span>
                </span>
              </a>
              <p className="text-sm leading-loose text-white/90">
                Your Trusted Travel & <br /> Digital Service Center. <br /> Providing trusted travel bookings and a complete range of digital services under one roof.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-5">
              <h3 className="font-heading text-base font-semibold text-[#F6821F]">Quick Links</h3>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-white/90 transition-colors hover:text-white hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div className="flex flex-col gap-5">
              <h3 className="font-heading text-base font-semibold text-[#F6821F]">Our Services</h3>
              <ul className="flex flex-col gap-3">
                {ourServices.map((service) => (
                  <li key={service.label}>
                    <a href={service.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/90 transition-colors hover:text-white hover:underline">
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-5">
              <h3 className="font-heading text-base font-semibold text-[#F6821F]">Contact Information</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-sm text-white/90">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span className="leading-relaxed">
                    24, Bimal Sinha Sarani,<br />
                    Hakim Para, Siliguri,{' '}
                    <a href="https://www.google.com/maps/search/?api=1&query=24,+Bimal+Sinha+Sarani,+Hakim+Para,+Siliguri,+West+Bengal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline transition-colors hover:text-white">
                      West Bengal <ExternalLink className="size-3" />
                    </a>
                  </span>
                </li>
                <li>
                  <a href="tel:+919732367890" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <Phone className="size-4 shrink-0" />
                    +91 97323 67890
                  </a>
                </li>
                <li>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=blcslg13@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <Mail className="size-4 shrink-0" />
                    blcslg13@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-white/90">
                  <Clock className="mt-0.5 size-4 shrink-0" />
                  <span>
                    Mon - Sun: 8:00 AM - 11:30 PM
                  </span>
                </li>
              </ul>
            </div>

            {/* Department Enquiries */}
            <div className="flex flex-col gap-5">
              <h3 className="font-heading text-base font-semibold text-[#F6821F]">Department Enquiries</h3>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-[#F59E0B]">Train Service</span>
                  <a href="tel:+919832067890" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <Phone className="size-4 shrink-0" />
                    +91 98320 67890
                  </a>
                  <a href="tel:+919733367890" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <Phone className="size-4 shrink-0" />
                    +91 97333 67890
                  </a>
                  <a href="https://wa.me/919732367890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <WhatsApp className="size-4 shrink-0" />
                    +91 97323 67890
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-[#F59E0B]">Bus & Flight Service</span>
                  <a href="tel:+917076212345" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <Phone className="size-4 shrink-0" />
                    +91 70762 12345
                  </a>
                  <a href="tel:+917076312345" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <Phone className="size-4 shrink-0" />
                    +91 70763 12345
                  </a>
                  <a href="https://wa.me/918436112345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white hover:underline">
                    <WhatsApp className="size-4 shrink-0" />
                    +91 84361 12345
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/70">
              © 2026 Baba Loknath Communication. All rights reserved.
            </p>
            <p className="text-sm text-white/70 pr-16 lg:pr-20">Designed & Developed By <a href="https://www.swapniltech.com/#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SWAPNIL</a></p>
          </div>
        </div>
      </footer>
      <MobileFooter />
    </>
  )
}
