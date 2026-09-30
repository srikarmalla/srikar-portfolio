import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Contact from './sections/Contact'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const progress =
        documentHeight > 0
          ? Math.min((scrollTop / documentHeight) * 100, 100)
          : 0

      setScrollProgress(progress)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const sectionAnimation = {
    initial: {
      opacity: 0,
      y: 60,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.12,
    },
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080816] text-white">

      {/* =====================================================
          SCROLL PROGRESS
      ====================================================== */}

      <motion.div
        className="fixed left-0 top-0 z-100 h-0.75 bg-gradient-to-r from-pink-500 via-red-500 to-orange-400"
        style={{
          width: `${scrollProgress}%`,
        }}
      />


      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Pink Glow */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-50 -top-50 h-125 w-125 rounded-full bg-pink-600/10 blur-3xl"
        />

        {/* Orange Glow */}
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-50 top-[30%] h-125 w-125 rounded-full bg-orange-500/10 blur-3xl"
        />

        {/* Purple Glow */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-50 left-[30%] h-125 w-125 rounded-full bg-purple-600/10 blur-3xl"
        />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/5 blur-3xl" />

      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main>

        {/* HERO */}
        <section id="home">
          <Hero />
        </section>


        {/* ABOUT */}
        <motion.section
          id="about"
          {...sectionAnimation}
        >
          <About />
        </motion.section>


        {/* SKILLS */}
        <motion.section
          id="skills"
          {...sectionAnimation}
        >
          <Skills />
        </motion.section>


        {/* PROJECTS */}
        <motion.section
          id="projects"
          {...sectionAnimation}
        >
          <Projects />
        </motion.section>


        {/* EDUCATION */}
        <motion.section
          id="education"
          {...sectionAnimation}
        >
          <Education />
        </motion.section>


        {/* CONTACT */}
        <motion.section
          id="contact"
          {...sectionAnimation}
        >
          <Contact />
        </motion.section>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-white/10 bg-black/20">

        <div className="mx-auto max-w-6xl px-6 py-12">

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

            {/* Logo / Name */}
            <div className="text-center md:text-left">

              <div className="flex items-center justify-center gap-3 md:justify-start">

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
                  <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-lg font-bold text-transparent">
                    MS
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold">
                    Srikar Malla
                  </h3>

                  <p className="text-sm text-slate-500">
                    CSE Student • Developer • Builder
                  </p>
                </div>

              </div>

            </div>


            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">

              <a
                href="#home"
                className="transition hover:text-white"
              >
                Home
              </a>

              <a
                href="#about"
                className="transition hover:text-white"
              >
                About
              </a>

              <a
                href="#projects"
                className="transition hover:text-white"
              >
                Projects
              </a>

              <a
                href="#contact"
                className="transition hover:text-white"
              >
                Contact
              </a>

            </div>

          </div>


          {/* Divider */}
          <div className="my-8 h-px bg-white/5" />


          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-600 md:flex-row">

            <p>
              © {new Date().getFullYear()} Srikar Malla. All rights reserved.
            </p>

            <p>
              Built with React + Tailwind CSS
            </p>

          </div>

        </div>

      </footer>


      {/* =====================================================
          BACK TO TOP
      ====================================================== */}

      <AnimatePresence>

        {scrollProgress > 10 && (

          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}

            whileHover={{
              scale: 1.08,
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }}

            aria-label="Back to top"

            className="
              fixed
              bottom-6
              right-6
              z-50
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/10
              text-lg
              backdrop-blur-lg
              transition
              hover:border-pink-500/30
              hover:bg-white/20
            "
          >
            ↑
          </motion.button>

        )}

      </AnimatePresence>

    </div>
  )
}