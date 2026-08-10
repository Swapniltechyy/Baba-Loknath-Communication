"use client"

import { motion } from "framer-motion"
import { Clock, Headphones, Lock, MapPin, Monitor, Phone, Plane, Shield, ShieldCheck, Star, Train, Bus, Zap, Mail } from "lucide-react"
import { PartnersCard } from "@/components/partners-card"
import { StatsBar } from "@/components/stats-bar"
import { ServicePills } from "@/components/service-pills"
import { site } from "@/lib/site"

const features = [
  { icon: Shield, title: "100%", subtitle: "Reliable Services" },
  { icon: Headphones, title: "24/7", subtitle: "Customer Support" },
  { icon: Lock, title: "Secure &", subtitle: "Easy Booking" },
]

const trustItems = [
  { icon: Star, label: "27+ Years" },
  { icon: MapPin, label: "Trusted Local" },
  { icon: Zap, label: "Fast Service" },
]

const serviceItems = [
  { icon: Train, label: "Train" },
  { icon: Plane, label: "Flight" },
  { icon: Bus, label: "Bus" },
  { icon: Monitor, label: "Cyber Cafe" },
]

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[calc(100vh-80px)] flex-col overflow-hidden">
      {/* ─── DESKTOP background layer (lg+) — original hero-bg.png ─── */}
      <div
        className="absolute inset-y-0 left-0 z-0 hidden w-full overflow-hidden lg:left-[5%] lg:block lg:w-[75%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, black 70%, transparent 100%), linear-gradient(to bottom, black 75%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to right, black 70%, transparent 100%), linear-gradient(to bottom, black 75%, transparent 100%)",
          maskComposite: "intersect",
        }}
      >
        <img
          src="/hero-bg.png"
          alt="Airplane, high-speed train and bus travelling through mountains by a lake at sunset"
          className="h-full w-full object-cover object-[55%_0%]"
        />
        {/* Wash on the far left so the headline and paragraph stay readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e9f1ff] from-20% via-[#e9f1ff]/70 via-42% to-transparent to-58%" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-start lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-6 lg:py-6 xl:gap-16">

        {/* Left column wrapper (Mobile background goes here) */}
        <div className="relative w-full lg:w-auto lg:p-0">

          {/* ========================================================================= */}
          {/* DESKTOP CONTENT (Exactly as original, hidden on mobile) */}
          {/* ========================================================================= */}
          <motion.div
            className="relative z-10 max-w-[560px] shrink-0 hidden lg:block px-4 pt-8 pb-12 sm:px-6 lg:p-0"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >

            {/* ─── DESKTOP-ONLY background layer (hidden on mobile, kept for desktop) ─── */}

            {/* Heading */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[34px] font-bold leading-[1.25] tracking-tight text-navy sm:text-[44px] lg:text-[55px]"
            >
              All Your Travel
              <br />
              &amp; Digital Needs,
              <br />
              <span className="text-brand-blue">Under One Roof</span>
            </motion.h1>

            {/* Orange underline */}
            <motion.div
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              style={{ originX: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-4 h-1 w-28 rounded-full bg-brand-orange"
            />

            {/* Paragraph */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-5 text-[15px] leading-[1.85] text-black/70"
            >
              Book Train, Flight, Bus &amp; Car Rentals with confidence.
              <br className="hidden sm:block" /> We also provide Projector Rental
              and complete
              <br className="hidden sm:block" /> Cyber Cafe services — all handled
              by a friendly,
              <br className="hidden sm:block" /> experienced team.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-x-7 gap-y-3"
            >
              {features.map((f) => (
                <div key={f.subtitle} className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-blue/20 bg-white/80 text-brand-blue">
                    <f.icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[14px] font-bold text-navy">
                      {f.title}
                    </span>
                    <span className="text-[11px] text-navy/55">{f.subtitle}</span>
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-3.5"
            >
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-orange/25 transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-3.5 w-3.5" fill="currentColor" />
                Call Now
              </a>
              <a
                href={site.whatsappHref}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-green/25 transition-transform hover:-translate-y-0.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-blue/40 bg-white/70 px-5 py-3 text-[15px] font-semibold text-brand-blue shadow-lg shadow-brand-blue/10 transition-all hover:-translate-y-0.5"
              >
                <Mail className="h-3.5 w-3.5" />
                Contact Us
              </a>
            </motion.div>
          </motion.div>
          {/* ========================================================================= */}
          {/* MOBILE CONTENT (Hidden on desktop) — exact match of reference design */}
          {/* ========================================================================= */}
          <div className="relative z-10 shrink-0 lg:hidden">
            <div className="relative flex flex-col px-5 pt-4.5" style={{ minHeight: "calc(100svh - 72px)" }}>
              {/* Background image — confined to upper portion so plane + vehicles match reference */}
              <div
                className="absolute inset-x-0 top-0 z-0 h-[72%] overflow-hidden"
                aria-hidden="true"
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                }}
              >
                <img src="/hero-bg-mob.png" alt="" className="h-full w-full object-cover object-[50%_53%]" />
                {/* Soft white wash across the top for headline readability */}
                <div
                  className="absolute inset-0"
                // style={{
                //   background:
                //     "linear-gradient(to bottom, rgba(243,248,255,0.95) 0%, rgba(243,248,255,0.85) 25%, rgba(243,248,255,0.5) 48%, transparent 64%)",
                // }}
                />
                {/* Extra wash on the left so text pops while the plane stays visible right */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 45% at 18% 22%, rgba(244,248,255,0.9) 0%, rgba(244,248,255,0.55) 45%, transparent 75%)",
                  }}
                />
              </div>

              {/* ─── Headline ─── */}
              <motion.div
                className="relative z-10"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
              >
                <motion.h1
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-navy text-[34px] font-bold leading-[1.15] tracking-tight text-balance"
                >
                  All Your
                  <br />
                  Travel &amp; Digital
                  <br />
                  Needs,
                  <br />
                  <span className="text-brand-blue">Under</span>
                  <br />
                  <span className="text-brand-blue">One Roof</span>
                </motion.h1>

                <motion.div
                  variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="bg-brand-orange mt-4 h-1 w-24 rounded-full"
                />

                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-navy/85 mt-4 max-w-[290px] text-[16px] font-medium leading-relaxed"
                >
                  Train, Flight &amp; Bus Booking with trusted support. Cyber Cafe services for all your digital needs.
                </motion.p>
              </motion.div>

              {/* Spacer — lets the train & bus in the image show through */}
              <div className="min-h-[30px] flex-1" />

              {/* ─── CTA Buttons ─── */}
              <div className="relative z-10 flex gap-3.5">
                <a
                  href={site.phoneHref}
                  className="bg-brand-orange shadow-brand-orange/30 inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl px-3 py-3 text-[17px] font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
                >
                  <Phone className="h-[18px] w-[18px]" fill="currentColor" />
                  Call Now
                </a>
                <a
                  href={site.whatsappHref}
                  className="bg-brand-green shadow-brand-green/30 inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl px-3.5 py-3.5 text-[17px] font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* ─── OUR SERVICES section ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="relative z-10 pb-5"
              >
                <div className="mt-4 flex items-start justify-between px-1">
                  {serviceItems.map((svc) => (
                    <a href="#services" key={svc.label} className="flex flex-col items-center gap-2.5 transition-opacity hover:opacity-80">
                      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-[0_4px_16px_-3px_rgba(26,43,86,0.12)]">
                        <svc.icon className="text-brand-blue h-[26px] w-[26px]" />
                      </div>
                      <span className="text-navy text-[13px] font-medium">{svc.label}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="hidden w-full justify-center px-4 pb-16 sm:px-6 lg:flex lg:w-auto lg:justify-end lg:px-0 lg:pb-0">
          <div className="w-full max-w-[460px]">
            <PartnersCard />
          </div>
        </div>
      </div>

      {/* ─── DESKTOP ONLY: Stats Bar & Service Pills ─── */}
      <div className="relative z-20 hidden w-full pb-6 lg:block">
        <div className="flex w-full flex-col gap-7">
          <StatsBar />
          <ServicePills />
        </div>
      </div>
    </section>
  )
}
