import { CreditCard, Headphones, Plane, Projector, Wallet } from "lucide-react"

const services = [
  { icon: Plane, label: "Train, Flight, Bus & Car Bookings" },
  { icon: Projector, label: "Projector Rental Services" },
  { icon: Wallet, label: "Cyber Cafe Services" },
  { icon: CreditCard, label: "Pan Card & More" },
  { icon: Headphones, label: "Fast & Easy Support" },
]

export function ServicePills() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-[10px] sm:px-6">
      <div className="flex flex-wrap justify-center gap-3">
        {services.map((s) => (
          <div
            key={s.label}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-navy/10 bg-white px-5 py-2 text-center shadow-[0_8px_24px_-20px_rgba(13,42,92,0.5)]"
          >
            <s.icon className="h-4 w-4 shrink-0 text-brand-blue" />
            <span className="whitespace-nowrap text-xs font-semibold text-navy">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
