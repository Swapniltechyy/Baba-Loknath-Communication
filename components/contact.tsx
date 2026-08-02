'use client'

import { useState, useMemo, type FormEvent, type ChangeEvent } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/lib/site'

const MAX_CHARS = 100

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

const details = [
  { icon: MapPin,        label: 'Address',        value: site.address,  href: 'https://maps.app.goo.gl/jYckndBzdbejPM8y8' },
  { icon: Phone,         label: 'Phone',           value: site.phone,    href: site.phoneHref  },
  { icon: WhatsAppIcon,  label: 'WhatsApp',        value: site.whatsapp, href: site.whatsappHref },
  { icon: Mail,          label: 'Email',           value: site.email,    href: site.emailHref  },
  { icon: Clock,         label: 'Business Hours',  value: site.hours                           },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [message,   setMessage]   = useState('')
  const charCount = useMemo(() => message.length, [message])
  const overLimit = charCount > MAX_CHARS

  function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Allow: backspace, delete, tab, escape, enter, arrows, home, end
    const allowed = ['Backspace','Delete','Tab','Escape','Enter','ArrowLeft','ArrowRight','Home','End']
    if (allowed.includes(e.key)) return
    // Block anything that is not a digit
    if (!/^\d$/.test(e.key)) e.preventDefault()
  }

  function handleMessageChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const raw = e.target.value
    // Hard cap at MAX_CHARS characters
    if (raw.length <= MAX_CHARS) {
      setMessage(raw)
    } else {
      setMessage(raw.slice(0, MAX_CHARS))
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (overLimit) return
    const form  = e.currentTarget
    const data  = new FormData(form)
    const name  = String(data.get('name')    ?? '').toUpperCase()
    const phone = String(data.get('phone')   ?? '')
    const email = String(data.get('email')   ?? '')

    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`
    )
    const whatsappUrl = `https://wa.me/919732367890?text=${body}`
    const a = document.createElement('a')
    a.href = whatsappUrl
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setSubmitted(true)
    setMessage('')
    form.reset()
  }

  return (
    <section id="contact" className="scroll-mt-14 bg-muted py-6 md:pt-8 md:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Contact Us
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            Get in touch with us today
          </h2>
        </div>

        <div className="mt-6 md:mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name — displayed & sent in UPPERCASE */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  style={{ textTransform: 'uppercase' }}
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Phone — digits only, max 10 */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone <span className="text-destructive">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                  placeholder="10-digit phone number"
                  pattern="\d{10}"
                  title="Please enter exactly 10 digits"
                  onKeyDown={handlePhoneKeyDown}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData('text')
                    if (!/^\d+$/.test(pasted)) e.preventDefault()
                  }}
                  className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Email — optional */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Message — max 100 words with live countdown */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={handleMessageChange}
                placeholder="How can we help you?"
                className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {/* Word counter — outside the box */}
              <div className="mt-1 flex justify-start">
                <span
                  className={`text-xs font-semibold tabular-nums transition-colors ${
                    charCount >= MAX_CHARS
                      ? 'text-destructive'
                      : charCount >= MAX_CHARS * 0.9
                      ? 'text-secondary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={overLimit}
              className="inline-flex items-center justify-center rounded-xl bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send Message
            </button>

            {submitted && (
              <p role="status" className="text-sm font-medium text-whatsapp">
                Thank you! WhatsApp should open to send your message.
              </p>
            )}
          </form>

          {/* Right: contact detail cards */}
          <ul className="flex flex-col gap-3">
            {details.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {value}
                    </span>
                  </div>
                </>
              )
              return (
                <li key={label} className="flex flex-1">
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') || href.startsWith('mailto') ? '_blank' : undefined}
                      rel={href.startsWith('http') || href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
                      className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/50 hover:bg-muted/50 hover:shadow-md"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                      {content}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Map — full width below both columns */}
        <div className="mt-8 overflow-hidden rounded-xl border border-border shadow-sm">
          <iframe
            title="Baba Loknath Communication location map"
            src={site.mapEmbed}
            width="100%"
            height="360"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
            className="block w-full"
          />
        </div>
      </div>
    </section>
  )
}
