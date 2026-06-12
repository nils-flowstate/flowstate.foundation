import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { Services } from './pages/Services'
// import { GrowTogether } from './pages/GrowTogether'
// import { ThankYou } from './pages/ThankYou'
import { Impressum } from './pages/Impressum'
import { Datenschutz } from './pages/Datenschutz'
import { Welcome } from './pages/Welcome'
import { NotFound } from './pages/NotFound'
import { track } from './lib/analytics'
import { useScrollDepth } from './hooks/useScrollDepth'

const NO_FOOTER_ROUTES = ['/grow-together/thank-you', '/welcome']
const NO_HEADER_ROUTES = ['/welcome']

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageTracker() {
  const { pathname } = useLocation()
  useEffect(() => {
    track('pageview')
    window.dataLayer?.push({ event: 'page_view', page_path: pathname })
  }, [pathname])
  return null
}

export function App() {
  const location = useLocation()
  useScrollDepth()

  const is404 = !['/', '/about-us', '/services', '/grow-together', '/grow-together/thank-you', '/welcome', '/impressum', '/datenschutz'].includes(location.pathname)
  const showFooter = !is404 && !NO_FOOTER_ROUTES.includes(location.pathname)
  const showHeader = !is404 && !NO_HEADER_ROUTES.includes(location.pathname)

  return (
    <>
      <ScrollToTop />
      <PageTracker />
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/grow-together" element={<GrowTogether />} />
          <Route path="/grow-together/thank-you" element={<ThankYou />} /> */}
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </>
  )
}
