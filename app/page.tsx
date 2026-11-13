import CTA from "@/app/components/homepage/CTA"
import Hero from "@/app/components/homepage/Hero"
import Pricing from "@/app/components/homepage/Pricing"
import Stats from "@/app/components/homepage/Stats"
import Navbar from "./components/shared/Navbar"
import Footer from "./components/shared/Footer"

const Homepage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}

export default Homepage
