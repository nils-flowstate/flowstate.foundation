import { HeroSection } from '../components/sections/HeroSection'
import { PainSection } from '../components/sections/PainSection'
import { MottoSection } from '../components/sections/MottoSection'
import { AboutPreviewSection } from '../components/sections/AboutPreviewSection'
import { ServicesPreviewSection } from '../components/sections/ServicesPreviewSection'
// import { CTASection } from '../components/sections/CTASection'

export function Home() {
  return (
    <>
      <HeroSection />
      <PainSection />
      <AboutPreviewSection />
      <ServicesPreviewSection />
      <MottoSection />
      {/* TODO Phase 2: ValuesSection */}
      {/* <CTASection /> */}
    </>
  )
}
