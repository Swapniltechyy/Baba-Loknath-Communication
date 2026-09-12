"use client"

import { Menu, Phone, X, ChevronRight } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { site } from "@/lib/site"

const navLinks = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Train Enquiry", href: "/train-enquiry", sectionId: "train-enquiry" },
  { label: "About Us", href: "/#about", sectionId: "about" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Contact Us", href: "/#contact", sectionId: "contact" },
]

const mobileNavLinks = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Train Enquiry", href: "/train-enquiry", sectionId: "train-enquiry" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "About Us", href: "/#about", sectionId: "about" },
  { label: "Contact Us", href: "/#contact", sectionId: "contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/train-enquiry") {
      setActiveSection("train-enquiry")
      return
    }

    const navbarHeight = 60
    const sectionIds = ["about", "services", "contact"]

    const handleScroll = () => {
      const sortedSections = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((s) => s.el !== null)
        .sort((a, b) => a.el!.getBoundingClientRect().top - b.el!.getBoundingClientRect().top)
      if (sortedSections.length === 0 || sortedSections[0].el!.getBoundingClientRect().top > navbarHeight + 10) {
        setActiveSection("home")
        return
      }
      for (const { id, el } of [...sortedSections].reverse()) {
        if (el!.getBoundingClientRect().top <= navbarHeight + 10) {
          setActiveSection(id)
          return
        }
      }
      setActiveSection("home")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setMobileOpen(false)
      if (href.startsWith("/") && !href.includes("#")) {
        // Standard page navigation (e.g. /train-enquiry or /)
        return
      }
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        // If on another page, navigate to root with hash
        window.location.href = href.startsWith("#") ? `/${href}` : href
        return
      }
      e.preventDefault()
      if (href === "#" || href === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }
      const id = href.replace("/#", "").replace("#", "")
      const el = document.getElementById(id)
      if (!el) return
      const navbarHeight = 60
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight
      window.scrollTo({ top, behavior: "smooth" })
    },
    [],
  )

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-navy/10 bg-background/95 backdrop-blur">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 sm:px-6">
          {/* Brand */}
          <a href="/" onClick={(e) => handleClick(e, "/")} className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Baba Loknath Communication" className="h-14 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="text-s font-bold tracking-tight text-navy">
                BABA LOKNATH
              </span>
              <span className="text-s font-semibold text-brand-orange">
                Communication
              </span>
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-blue ${isActive ? "text-brand-blue" : "text-navy/80"
                      }`}
                  >
                    {link.label}
                    {isActive ? (
                      <span className="absolute -bottom-[13px] left-0 h-[3px] w-full rounded-full bg-brand-blue" />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Desktop Call Now — hidden on mobile */}
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2.5 rounded-lg border border-brand-orange/25 bg-brand-orange/5 px-2.5 py-1.5 transition-colors hover:bg-brand-orange/10 lg:flex sm:px-3"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange text-white">
              <Phone className="h-3.5 w-3.5" fill="currentColor" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-navy">Call Now</span>
            </span>
          </a>

          {/* Mobile hamburger button — visible below lg */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy/10 bg-white text-navy transition-colors hover:bg-navy/5 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </header>

      {/* ─── Mobile menu overlay + panel ─── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in side drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[110] flex w-full max-w-[280px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-navy/5 px-5 py-4">
          <span className="font-heading text-lg font-bold text-navy">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/5 text-navy transition-colors hover:bg-navy/10 active:bg-navy/15"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-1.5 px-3 py-5">
          {mobileNavLinks.map((link) => {
            const isActive = activeSection === link.sectionId

            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-blue/10 text-brand-blue"
                      : "text-navy hover:bg-navy/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-brand-blue" />
                    ) : null}
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${isActive ? "text-brand-blue" : "text-navy/30"}`} />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Action buttons at bottom */}
        <div className="mt-auto flex flex-col gap-3 border-t border-navy/5 p-5 pb-7">
          <a
            href={site.phoneHref}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3.5 text-[15px] font-bold text-white shadow-md shadow-brand-orange/20 transition-transform active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" fill="currentColor" />
            Call Now
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-[15px] font-bold text-white shadow-md shadow-[#25D366]/20 transition-transform active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

