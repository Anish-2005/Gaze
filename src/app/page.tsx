import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import UseCases from '@/components/UseCases'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import SocialImpact from '@/components/SocialImpact'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <UseCases />
      <HowItWorks />
      <Pricing />
      <SocialImpact />
      <CTA />
      <Footer />
    </main>
  )
}