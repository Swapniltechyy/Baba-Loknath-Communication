'use client'

import { useState } from 'react'
import {
  Bus,
  Car,
  Copy,
  CreditCard,
  FileText,
  Monitor,
  Plane,
  Printer,
  ScanLine,
  Train,
  Video,
  ChevronRight,
  Package,
  Banknote,
  X,
  Phone,
  CheckCircle2
} from 'lucide-react'
import { site } from '@/lib/site'

const PHONE = '919732367890'

function waLink(service: string, phone = '919732367890') {
  const msg = encodeURIComponent(
    `Hello Baba Loknath Communication, I would like to enquire about your *${service}*. Please guide me further.`,
  )
  return `https://wa.me/${phone}?text=${msg}`
}

const services = [
  {
    icon: Train,
    title: 'Train Ticket Booking',
    description: 'Reserved & general train tickets booked quickly for any route across India.',
    phone: '919832067890',
  },
  {
    icon: Plane,
    title: 'Flight Ticket Booking',
    description: 'Domestic and international flight bookings at competitive fares.',
    phone: '918436112345',
  },
  {
    icon: Bus,
    title: 'Bus Ticket Booking',
    description: 'Comfortable AC & non-AC bus tickets for local and long-distance travel.',
    phone: '918436112345',
  },
  {
    icon: Car,
    title: 'Car Rental Services',
    description: 'Well-maintained cars for outstation trips, weddings and daily rentals.',
  },
  {
    icon: Video,
    title: 'Projector Rental',
    description: 'HD projectors on rent for events, functions, meetings and screenings.',
  },
  {
    icon: Monitor,
    title: 'Cyber Cafe Services',
    description: 'High-speed internet, browsing, downloads and complete computer assistance.',
  },
  {
    icon: FileText,
    title: 'Online Form Fill-up',
    description: 'Government, exam and job application forms filled accurately and on time.',
  },
  {
    icon: Printer,
    title: 'Printing & Scanning',
    description: 'Color & black-and-white printing, scanning, Xerox and photocopying.',
  },
  {
    icon: CreditCard,
    title: 'Passport Photo',
    description: 'Instant passport-size and other standard photo prints.',
  },
  {
    icon: Copy,
    title: 'Lamination',
    description: 'Protect your important documents and certificates with quality lamination.',
  },
  {
    icon: ScanLine,
    title: 'Xerox',
    description: 'Fast, affordable photocopying for single sheets or bulk documents.',
  },
  {
    icon: FileText,
    title: 'Other Digital Services',
    description: 'Recharges, bill payments and a wide range of everyday digital tasks.',
  },
]

// Mobile-specific data format for the new grid layout
const mobileServices = [
  {
    id: 'train',
    icon: Train,
    title: 'Train Ticket Booking',
    subtitle: 'IRCTC Booking',
    features: ['General Booking', 'Senior Citizen', 'Instant Booking']
  },
  {
    id: 'flight',
    icon: Plane,
    title: 'Flight Booking',
    subtitle: 'Domestic & International',
    features: ['Lowest Fares', 'Web Check-in Assistance', 'Date Rescheduling', 'Group Bookings']
  },
  {
    id: 'bus',
    icon: Bus,
    title: 'Bus Booking',
    subtitle: 'All Major Operators',
    features: ['AC/Non-AC Sleeper', 'Volvo/Scania Buses', 'Advance Seat Selection', 'Instant Confirmation']
  },
  {
    id: 'car',
    icon: Car,
    title: 'Car Rental',
    subtitle: 'Local & Outstation',
    features: ['Sedan, SUV & Hatchback', 'Airport Transfers', 'Wedding Rentals', 'Sightseeing Tours']
  },
  {
    id: 'cyber',
    icon: Monitor,
    title: 'Cyber Cafe',
    subtitle: 'Digital Services',
    features: ['High-Speed Browsing', 'Email & Downloading', 'Admit Card Print', 'Result Checking']
  },
  {
    id: 'print',
    icon: Printer,
    title: 'Print Out',
    subtitle: 'Colour & B/W',
    features: ['Laser & Inkjet Printing', 'A4 to Legal Sizes', 'Project Printing', 'Bulk Printing Discount']
  },
  {
    id: 'xerox',
    icon: ScanLine,
    title: 'Xerox',
    subtitle: 'Fast Copy Service',
    features: ['Single/Double Sided', 'ID Card Copying', 'Book Photocopying', 'Bulk Orders']
  },
  {
    id: 'lamination',
    icon: Copy,
    title: 'Lamination',
    subtitle: 'Document Protection',
    features: ['ID Cards & Aadhar', 'Marksheets & Certificates', 'High-Quality Pouches', 'Instant Delivery']
  },
  {
    id: 'courier',
    icon: Package,
    title: 'Courier',
    subtitle: 'India Wide Delivery',
    features: ['Document & Parcel', 'Express Delivery', 'Real-Time Tracking', 'Secure Packaging']
  },
  {
    id: 'form',
    icon: FileText,
    title: 'Form Fill-Up',
    subtitle: 'Online Applications',
    features: ['Govt. Job Applications', 'College Admissions', 'Scholarship Forms', 'Passport Application']
  },
  {
    id: 'money',
    icon: Banknote,
    title: 'Money Withdrawal',
    subtitle: 'AEPS Service',
    features: ['Aadhar Based Withdrawal', 'Mini Statement', 'Balance Enquiry', 'Secure Transactions']
  },
  {
    id: 'projector',
    icon: Video,
    title: 'Projector Rental',
    subtitle: 'Daily & Event Basis',
    features: ['High Definition Projectors', 'Screen Included', 'Setup Assistance', 'Affordable Rates']
  },
]

// WhatsApp SVG icon (official brand mark)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Services() {
  const [selectedMobileService, setSelectedMobileService] = useState<(typeof mobileServices)[0] | null>(null)

  return (
    <section id="services" className="scroll-mt-14 bg-muted py-10 md:pt-8 md:pb-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-6">
        
        {/* ===================== DESKTOP VIEW ===================== */}
        <div className="hidden md:block">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
              Our Services
            </span>
            <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
              Everything you need, all in one place
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              From travel bookings to printing and cyber cafe services, we handle it all with speed
              and care.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, description, phone }) => (
              <article
                key={title}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

                {/* WhatsApp CTA */}
                <a
                  href={waLink(title, phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Enquire about ${title} on WhatsApp`}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/8 px-4 py-2 text-sm font-semibold text-[#128C7E] transition-colors duration-200 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  Enquire on WhatsApp
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* ===================== MOBILE VIEW ===================== */}
        <div className="md:hidden">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              OUR SERVICES
            </span>
            <h2 className="mt-2 text-balance font-heading text-[28px] leading-tight font-bold text-primary">
              Everything You Need,<br />All in One Place
            </h2>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground px-2">
              Travel, Digital & Utility Services — trusted by thousands of customers across Siliguri for over 18 years.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="mt-10 grid grid-cols-2 gap-3">
            {mobileServices.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedMobileService(srv)}
                className="group flex h-[132px] flex-col justify-between rounded-[18px] bg-white p-4 shadow-[0_4px_16px_rgb(0,0,0,0.04)] transition-transform active:scale-[0.98] text-left ring-1 ring-border/20"
              >
                <div className="flex w-full items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <srv.icon className="size-5" />
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground/30 transition-colors group-hover:text-primary/50" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-heading text-[13px] font-bold text-primary leading-snug">{srv.title}</span>
                  <span className="text-[11px] font-medium text-muted-foreground">{srv.subtitle}</span>
                </div>
              </button>
            ))}
          </div>


        </div>

      </div>

      {/* Mobile Service Detail Modal (Bottom Sheet style) */}
      {selectedMobileService && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm md:hidden p-4 pb-0">
          <div className="w-full max-w-md animate-in slide-in-from-bottom-12 rounded-t-[24px] bg-white p-6 pb-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/50 pb-5">
              <div className="flex items-center gap-3.5">
                <span className="flex size-[52px] items-center justify-center rounded-full bg-primary/10 text-primary">
                  <selectedMobileService.icon className="size-6" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-heading text-[19px] font-bold text-primary leading-tight">{selectedMobileService.title}</h3>
                  <p className="text-[13px] font-medium text-muted-foreground">{selectedMobileService.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMobileService(null)}
                className="rounded-full bg-muted/50 p-2 text-muted-foreground hover:bg-muted active:bg-muted transition-colors"
                aria-label="Close details"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <div className="py-7 px-1">
              <ul className="flex flex-col gap-4">
                {selectedMobileService.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3.5 text-[15px] font-semibold text-primary">
                    <CheckCircle2 className="size-[22px] text-secondary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={site.phoneHref}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-[15px] font-bold text-white shadow-sm active:bg-primary/90 transition-colors"
              >
                <Phone className="size-[18px]" />
                Call Now
              </a>
              <a
                href={waLink(selectedMobileService.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-4 text-[15px] font-bold text-white shadow-sm active:bg-[#25D366]/90 transition-colors"
              >
                <WhatsAppIcon className="size-[18px]" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
