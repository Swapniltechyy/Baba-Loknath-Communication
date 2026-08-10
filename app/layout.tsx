import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const siteUrl = 'https://babaloknathcommunication.com'
const siteName = 'Baba Loknath Communication'
const siteDescription =
  'Baba Loknath Communication — your trusted travel & digital service center. Train, flight, bus ticket booking, car & projector rental, cyber cafe, printing, scanning, online form fill-up and more.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Trusted Travel & Digital Services`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'train ticket booking',
    'flight ticket booking',
    'bus ticket booking',
    'car rental',
    'projector rental',
    'cyber cafe',
    'online form fill-up',
    'printing and scanning',
    'passport photo',
    'Baba Loknath Communication',
  ],
  authors: [{ name: siteName }],
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: `${siteName} — Trusted Travel & Digital Services`,
    description: siteDescription,
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Trusted Travel & Digital Services`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0F4C81',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  telephone: '+91-98765-43210',
  image: `${siteUrl}/hero-travel-digital.png`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Road, Near Bus Stand',
    addressLocality: 'Your City',
    addressRegion: 'West Bengal',
    postalCode: '700001',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Su 08:00-21:00',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth bg-background`}>
      <body className="font-sans antialiased">
        {/* iOS Safari needs a global touchstart listener for CSS :active to work */}
        <script dangerouslySetInnerHTML={{ __html: `document.addEventListener("touchstart",function(){},true);` }} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
