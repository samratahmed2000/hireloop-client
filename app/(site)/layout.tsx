import Navbar from "@/app/components/shared/Navbar"
import Footer from "@/app/components/shared/Footer"

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default SiteLayout
