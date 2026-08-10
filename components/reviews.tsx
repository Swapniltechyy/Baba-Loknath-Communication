'use client'

import { useState, useRef, useEffect } from 'react'
import { Star, Quote, CheckCircle2, ShieldCheck, Users, Award } from 'lucide-react'
import { useCustomerCount } from '@/hooks/use-customer-count'

const reviews = [
  {
    name: 'Rahul Sharma',
    role: 'Regular Customer',
    text: 'Booked train and flight tickets here many times. Always quick, honest and helpful. Highly recommended!',
  },
  {
    name: 'Priya Das',
    role: 'Small Business Owner',
    text: 'Rented a projector for our event and it worked perfectly. Fair price and very cooperative staff.',
  },
  {
    name: 'Amit Ghosh',
    role: 'Student',
    text: 'They helped me fill up my exam form and printed all documents on time. Reliable cyber cafe service.',
  },
  {
    name: 'Sneha Roy',
    role: 'Frequent Traveller',
    text: 'Best place for bus and car rental bookings in the area. Trustworthy and always available when needed.',
  },
  {
    name: 'Manoj Verma',
    role: 'Local Resident',
    text: 'From Xerox to passport photos, everything is done quickly. Friendly people and transparent pricing.',
  },
  {
    name: 'Kavita Singh',
    role: 'Homemaker',
    text: 'I trust them completely with all my online forms and payments. Genuine and professional service.',
  },
]

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-secondary text-secondary" aria-hidden="true" />
      ))}
    </div>
  )
}

function MobileReviews() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { formatted: formattedCustomers } = useCustomerCount()

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const width = scrollRef.current.offsetWidth
    const index = Math.round(scrollLeft / width)
    setActiveIndex(index)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const width = scrollRef.current.offsetWidth
        const nextIndex = (activeIndex + 1) % reviews.length
        scrollRef.current.scrollTo({ left: width * nextIndex, behavior: 'smooth' })
      }
    }, 2000)
    return () => clearInterval(timer)
  }, [activeIndex])

  return (
    <div className="flex flex-col items-center lg:hidden">
      {/* Mobile Trust Summary */}
      <div className="mt-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-5 fill-secondary text-secondary" />
          ))}
        </div>
        <p className="mt-3 font-heading text-xl font-bold text-primary">4.9/5 Customer Rating</p>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground">Based on {formattedCustomers} Happy Customers</p>
        <p className="mt-0.5 text-sm font-medium text-muted-foreground">Serving Siliguri Since 1999</p>
      </div>

      {/* Mobile Carousel */}
      <div className="relative mt-10 w-full max-w-[100vw] overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full snap-x snap-mandatory overflow-x-auto pb-6 pt-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review, i) => (
            <div key={i} className="w-full shrink-0 snap-center px-4 sm:px-8">
              <div className="mx-auto flex h-full max-w-sm flex-col rounded-[20px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-border/30">
                <Quote className="mb-4 size-8 text-secondary/30" />
                <Stars />
                <p className="mt-5 text-base font-medium leading-relaxed text-primary line-clamp-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-heading text-sm font-bold text-primary">{review.name}</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="size-3.5" />
                      Verified Customer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-2 flex justify-center gap-2.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-secondary' : 'w-2 bg-secondary/25'
                }`}
              onClick={() => {
                if (scrollRef.current) {
                  const width = scrollRef.current.offsetWidth
                  scrollRef.current.scrollTo({ left: width * i, behavior: 'smooth' })
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Bottom Trust Strip */}
      <div className="mt-12 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/50 sm:items-start sm:px-8">
        <div className="flex items-center gap-3.5 text-sm font-semibold tracking-wide text-primary">
          <ShieldCheck className="size-5 text-secondary" />
          Trusted Local Business
        </div>
        <div className="flex items-center gap-3.5 text-sm font-semibold tracking-wide text-primary">
          <Award className="size-5 text-secondary" />
          27+ Years Experience
        </div>
        <div className="flex items-center gap-3.5 text-sm font-semibold tracking-wide text-primary">
          <Users className="size-5 text-secondary" />
          {formattedCustomers} Happy Customers
        </div>
      </div>
    </div>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-background py-10 md:py-16">
      <div className="mx-auto max-w-[1400px] lg:px-6">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-0">
          <span className="text-sm font-semibold uppercase tracking-wide text-secondary">
            Customer Reviews
          </span>
          <h2 className="mt-2 text-balance font-heading text-3xl font-bold text-primary sm:text-4xl">
            What our customers say
          </h2>
        </div>

        {/* Mobile View */}
        <MobileReviews />

        {/* Desktop View */}
        <div className="mt-12 hidden gap-6 px-6 lg:grid lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <Stars />
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground">
                  {review.name.charAt(0)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
