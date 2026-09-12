'use client'

import React from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FloatingActions } from '@/components/floating-actions'
import { TrainSearchForm } from '@/components/train-search-form'
import { ArrowLeft } from 'lucide-react'

export default function TrainEnquiryPage() {
  return (
    <div className="min-h-screen bg-[#F4F8FC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center px-4 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1565C0] hover:text-[#0D47A1] mb-3.5 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>

          {/* Form ONLY */}
          <TrainSearchForm className="border border-blue-100 shadow-[0_12px_36px_-6px_rgba(21,101,192,0.12)]" />
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
