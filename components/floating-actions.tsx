'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, Phone } from 'lucide-react'
import { site } from '@/lib/site'

export function FloatingActions() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY > 500
      setShowTopBtn(scrolled)
      
      const aboutEl = document.getElementById('about')
      const whyChooseUsEl = document.getElementById('why-choose-us')
      const reviewsEl = document.getElementById('reviews')
      const contactEl = document.getElementById('contact')
      
      let inView = false
      
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) inView = true
      }
      
      if (whyChooseUsEl) {
        const rect = whyChooseUsEl.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) inView = true
      }
      
      if (reviewsEl) {
        const rect = reviewsEl.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) inView = true
      }

      // Hide if the Contact section is substantially in the viewport
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          inView = false
        }
      }
      
      setShowContact(inView)
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (!showTopBtn && !showContact) return null

  return (
    <div className="fixed bottom-5 right-3 z-50 flex flex-col items-end gap-3">
      {/* Back to top button */}
      {showTopBtn && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="flex size-9 md:size-11 items-center justify-center rounded-full bg-[#69C2FA] text-white shadow-md transition-all hover:-translate-y-1 hover:opacity-90 hover:shadow-lg"
        >
          <ArrowUp className="size-4 md:size-5" />
        </button>
      )}

      {/* Call & WhatsApp buttons */}
      {showContact && (
        <>
          <a
            href={site.phoneHref}
            aria-label="Call now"
            className="flex size-9 md:size-11 items-center justify-center rounded-full bg-brand-blue text-white shadow-md transition-all hover:-translate-y-1 hover:opacity-90 hover:shadow-lg"
          >
            <Phone className="size-4 md:size-5" fill="currentColor" />
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex size-9 md:size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-all hover:-translate-y-1 hover:opacity-90 hover:shadow-lg"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 md:size-5" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </>
      )}
    </div>
  )
}
