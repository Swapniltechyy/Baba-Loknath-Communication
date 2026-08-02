'use client'

import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const features = [
  '18+ Years of Trust',
  'Serving Siliguri',
  'Authorized Ticket Booking',
  'Fast & Reliable Service',
  'Transparent Pricing',
  'Customer First',
]

const mobileFeatures = [
  '18+ Years of Trust',
  'Serving Siliguri',
  'Authorized Ticket Booking',
  'Fast & Reliable Service',
  'Transparent Pricing',
  'Customer First',
]

// target: numeric end value, suffix: trailing symbol(s)
const stats = [
  { target: 18,   suffix: '+',  label: 'Years'     },
  { target: 5000, suffix: '+',  label: 'Customers' },
  { target: 12,   suffix: '+',  label: 'Services'  },
  { target: 100,  suffix: '%',  label: 'Trusted'   },
]

/** Eased count-up from 0 → end over `duration` ms */
function useCountUp(end: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, end, duration])

  return count
}

function StatItem({
  target, suffix, label, active, delay,
}: {
  target: number; suffix: string; label: string; active: boolean; delay: number
}) {
  const count = useCountUp(target, 1600, active)

  return (
    <div
      className="flex flex-col items-center gap-0.5 px-2 text-center"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <span className="font-heading text-xl font-extrabold text-primary sm:text-2xl">
        {active ? count : 0}{suffix}
      </span>
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // re-trigger every time the card enters the viewport
        setHasAnimated(entry.isIntersecting)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className="scroll-mt-14 bg-background"
      style={{ minHeight: 'calc(100vh - 56px)' }}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 px-4 py-10 sm:px-6 md:grid-cols-[1fr_1fr] md:py-12 lg:gap-14 xl:gap-20">

        {/* ── LEFT ── */}
        <div className="flex flex-col justify-center gap-0">

          <span className="text-sm font-bold uppercase tracking-widest text-secondary">
            About Us
          </span>

          <h2 className="mt-3 text-balance font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl lg:text-[2rem] xl:text-4xl">
            A genuine, reliable business<br className="hidden lg:block" /> you can count on
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Baba Loknath Communication has been proudly serving the people of Siliguri, West Bengal
            for over 18 years. We started as a small neighbourhood service centre and have grown
            into a trusted one-stop destination for both travel bookings and essential digital
            services. Whether you need a train, flight, bus, or hotel reservation — or require
            printouts, Xerox, lamination, courier, passport photos, or online form assistance —
            our experienced team handles it all under one roof. We believe in honest pricing,
            zero hidden charges, and putting our customers first, every single time.
          </p>

          {/* Feature checklist — Desktop */}
          <ul className="mt-6 hidden grid-cols-2 gap-x-4 gap-y-2.5 md:grid">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-secondary" />
                <span className="text-sm font-medium text-foreground">{f}</span>
              </li>
            ))}
          </ul>

          {/* Feature checklist — Mobile */}
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 md:hidden">
            {mobileFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-secondary" />
                <span className="text-sm font-medium text-foreground">{f}</span>
              </li>
            ))}
          </ul>

          {/* Stats row — animated on scroll into view */}
          <div
            ref={statsRef}
            className="mt-7 grid grid-cols-4 divide-x divide-border rounded-xl border border-border bg-muted/40 py-3"
          >
            {stats.map(({ target, suffix, label }, i) => (
              <StatItem
                key={label}
                target={target}
                suffix={suffix}
                label={label}
                active={hasAnimated}
                delay={i * 120}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="hidden items-end justify-center md:flex">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: 'clamp(330px,63vh,650px)' }}
          >
            <Image
              src="/about-us-img.png"
              alt="Baba Loknath Communication — travel and digital services"
              fill
              sizes="(max-width: 768px) 0px, 50vw"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
