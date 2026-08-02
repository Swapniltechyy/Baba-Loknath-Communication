import { Handshake, ShieldCheck } from "lucide-react"
import { PartnerLogos } from "@/components/partner-logos"

export function PartnersCard() {
  return (
    <div id="partners" className="w-full scroll-mt-24 rounded-2xl bg-white/75 p-5 shadow-[0_30px_70px_-30px_rgba(13,42,92,0.45)] backdrop-blur-md sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-2.5">
        {/* <span className="hidden h-px w-7 bg-brand-blue/40 sm:block" /> */}
        <h2 className="text-xl font-bold tracking-tight text-blue-600">
          Our Authorized Partners
        </h2>
        {/* <span className="hidden h-px w-7 bg-brand-blue/40 sm:block" /> */}
      </div>
      <p className="mt-1 text-center text-[11.5px] text-navy/60">
        Trusted by India&apos;s leading platforms
      </p>

      {/* Logo grid */}
      <div className="mt-4">
        <PartnerLogos />
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand-blue/5 px-3 py-2.5">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-blue" />
        <p className="text-center text-[11px] font-medium text-brand-blue">
          Official booking partners for trusted &amp; secure services
        </p>
      </div>
    </div>
  )
}
