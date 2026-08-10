"use client"

import { Briefcase, Headphones, ShieldCheck, Trophy, Users } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useCustomerCount } from "@/hooks/use-customer-count"

const stats = [
  { icon: Trophy, value: "27+", label: "Years of Experience" },
  { icon: Users, value: "5,000+", label: "Happy Customers" },
  { icon: Briefcase, value: "12+", label: "Services Offered" },
  { icon: ShieldCheck, value: "100%", label: "Secure & Reliable" },
  { icon: Headphones, value: "24/7", label: "Customer Support" },
]

function parseStatValue(value: string) {

  if (value === "24/7") return { num: 24, prefix: "", suffix: "/7" }

  const match = value.match(/^([^\d]*?)([\d,]+)(.*)$/)
  if (!match) return { num: 0, prefix: "", suffix: value }

  return {
    prefix: match[1],
    num: parseInt(match[2].replace(/,/g, ""), 10),
    suffix: match[3],
  }
}

function formatNumber(n: number) {
  return n.toLocaleString("en-IN")
}

const DURATION_MS = 1800

function useCountUp(target: number, running: boolean) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) {
      setDisplay(0)
      return
    }

    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / DURATION_MS, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, running])

  return display
}

function AnimatedStat({
  icon: Icon,
  value,
  label,
  running,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  running: boolean
}) {
  const { num, prefix, suffix } = parseStatValue(value)
  const displayed = useCountUp(num, running)

  return (
    <div className="flex items-center gap-3 px-2 md:justify-center">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[17px] font-extrabold text-white">
          {prefix}
          {formatNumber(displayed)}
          {suffix}
        </span>
        <span className="text-[11px] text-white/75">{label}</span>
      </span>
    </div>
  )
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { formatted: formattedCustomers } = useCustomerCount()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Reset so re-entering the viewport re-triggers the animation
          setIsVisible(false)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
      <div
        ref={ref}
        className="grid w-full grid-cols-2 gap-y-3 rounded-2xl bg-navy px-5 py-3.5 shadow-[0_18px_40px_-24px_rgba(13,42,92,0.6)] sm:grid-cols-3 md:grid-cols-5 md:divide-x md:divide-white/15"
      >
        {stats.map((s) => (
          <AnimatedStat 
            key={s.label} 
            running={isVisible} 
            {...s} 
            value={s.label === 'Happy Customers' ? formattedCustomers : s.value} 
          />
        ))}
      </div>
    </div>
  )
}
