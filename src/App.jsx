import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import FloatingActions from './components/FloatingActions'
import { useLenis } from './lib/useLenis'

// Everything below the fold is code-split so the hero paints fast.
const Projects = lazy(() => import('./components/Projects'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Gallery = lazy(() => import('./components/Gallery'))
const FAQ = lazy(() => import('./components/FAQ'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const SectionFallback = () => <div className="h-[60vh] w-full" aria-hidden="true" />

export default function App() {
  useLenis()

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-maroonDark"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />

        <Suspense fallback={<SectionFallback />}>
          <Projects />
          <WhyChooseUs />
          <Testimonials />
          <Gallery />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>

      <FloatingActions />
    </>
  )
}
