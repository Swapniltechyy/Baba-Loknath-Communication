import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { FloatingActions } from '@/components/floating-actions'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { Reviews } from '@/components/reviews'
import { Services } from '@/components/services'
import { WhyChooseUs } from '@/components/why-choose-us'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero block: gradient wrapper with hero */}
        <div className="bg-gradient-to-b from-[#dfecff] via-[#eef4ff] to-white">
          <Hero />
        </div>

        <div className="flex flex-col">
          <div className="order-2 md:order-1">
            <About />
          </div>
          <div className="order-1 md:order-2">
            <Services />
          </div>
        </div>
        <WhyChooseUs />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
