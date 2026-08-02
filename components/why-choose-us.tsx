import {
  BadgeCheck,
  Clock,
  Headphones,
  Lock,
  Smile,
  Tag,
  Users,
  Zap,
} from 'lucide-react'

const reasons = [
  { icon: BadgeCheck, title: 'Trusted Service', text: 'Years of dependable service earning genuine customer trust.' },
  { icon: Users, title: 'Experienced Team', text: 'A knowledgeable team that handles every request with expertise.' },
  { icon: Tag, title: 'Affordable Pricing', text: 'Fair, transparent prices with no hidden charges.' },
  { icon: Zap, title: 'Fast Booking', text: 'Quick confirmations so you never miss your journey.' },
  { icon: Lock, title: 'Secure Transactions', text: 'Your payments and personal details stay safe with us.' },
  { icon: Smile, title: 'Customer Satisfaction', text: 'Thousands of happy customers who keep coming back.' },
  { icon: Headphones, title: 'Quick Support', text: 'Friendly help before, during and after your booking.' },
  { icon: Clock, title: 'Convenient Hours', text: 'Open all week so you can visit whenever it suits you.' },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="hidden md:block bg-background py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Reasons customers rely on us
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-secondary/50 hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary/15 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                <Icon className="size-6" />
              </span>
              <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
