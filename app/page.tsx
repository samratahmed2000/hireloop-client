import CTA from "./components/homepage/CTA"
import Hero from "./components/homepage/Hero"
import Pricing from "./components/homepage/Pricing"
import Stats from "./components/homepage/Stats"

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
