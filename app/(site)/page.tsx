import CTA from "@/app/components/homepage/CTA"
import Hero from "@/app/components/homepage/Hero"
import Pricing from "@/app/components/homepage/Pricing"
import Stats from "@/app/components/homepage/Stats"

const Homepage = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <Pricing />
      <CTA />
    </main>
  )
}

export default Homepage
