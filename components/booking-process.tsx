import { CheckCircle2, ClipboardList, PhoneCall, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: PhoneCall,
    step: 'Step 1',
    title: 'Contact Us',
    text: 'Call, WhatsApp or visit our center to get started.',
  },
  {
    icon: ClipboardList,
    step: 'Step 2',
    title: 'Tell Us Your Requirement',
    text: 'Share your travel plans or the service you need.',
  },
  {
    icon: CheckCircle2,
    step: 'Step 3',
    title: 'Booking Confirmation',
    text: 'We process it quickly and confirm all the details.',
  },
  {
    icon: Sparkles,
    step: 'Step 4',
    title: 'Enjoy Our Service',
    text: 'Relax and enjoy a smooth, hassle-free experience.',
  },
]

export function BookingProcess() {
  return (
    <section className="bg-muted py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
            How It Works
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            A simple 4-step booking process
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map(({ icon: Icon, step, title, text }, index) => (
            <li key={title} className="relative flex flex-col items-center text-center">
              <div className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <Icon className="size-7" />
                <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-secondary font-heading text-sm font-bold text-secondary-foreground">
                  {index + 1}
                </span>
              </div>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">
                {step}
              </span>
              <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
