const logos = [
  /* Row 1 */
  { src: "/logos/irctc.png", alt: "IRCTC" },
  { src: "/logos/redbus.png", alt: "redBus" },
  { src: "/logos/air-india-express.png", alt: "Air India Express" },
  /* Row 2 */
  { src: "/logos/yatra.png", alt: "Yatra" },
  { src: "/logos/make-my-trip.png", alt: "MakeMyTrip" },
  { src: "/logos/akasa-sir.png", alt: "Akasa Air" },
  /* Row 3 */
  { src: "/logos/indigo.png", alt: "IndiGo" },
  { src: "/logos/Volvo.png", alt: "Volvo" },
  { src: "/logos/tbo.jpg", alt: "TBO" },
  /* Row 4 */
  { src: "/logos/tripjack.png", alt: "Tripjack" },
  { src: "/logos/cleartrip.png", alt: "Cleartrip" },
  { src: "/logos/alhind-air.jpg", alt: "Alhind Air" },
]

export function PartnerLogos() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {logos.map((logo, i) => (
        <div
          key={i}
          className="flex h-[58px] items-center justify-center rounded-lg bg-white px-2 shadow-[0_2px_10px_-6px_rgba(13,42,92,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-md cursor-default"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-8 max-w-[90px] object-contain"
          />
        </div>
      ))}
    </div>
  )
}
