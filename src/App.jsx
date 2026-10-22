import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Contact from './sections/Contact'

const CharacterUniverse = lazy(() => import('./pages/CharacterUniverse'))
const Reply = lazy(() => import('./pages/Reply'))

function UniverseLoadingFallback() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050508] text-white">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-400" />
        <div className="h-3 w-3 rounded-full bg-violet-400 shadow-lg shadow-violet-500/50" />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
        Loading Character Universe...
      </p>
    </div>
  )
}

function PageLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-pink-500" />
    </div>
  )
}

function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location.replace(url)
  }, [url])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050508] text-white">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-pink-500" />
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
        Redirecting to SpendWise...
      </p>
      <a href={url} className="mt-3 text-xs text-pink-400 underline">
        Click here if not redirected automatically
      </a>
    </div>
  )
}

function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight
          const progress =
            documentHeight > 0
              ? Math.min((scrollTop / documentHeight) * 100, 100)
              : 0
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })
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
      <motion.div
        className="
          fixed
          left-0
          top-0
          z-[100]
          h-[3px]
          bg-gradient-to-r
          from-pink-500
          via-red-500
          to-orange-400
        "
        style={{
          width: `${scrollProgress}%`,
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '50px 50px',
          }}
        />
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
          className="
            absolute
            -left-50
            -top-50
            h-125
            w-125
            rounded-full
            bg-pink-600/10
            blur-3xl
          "
        />
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
          className="
            absolute
            -right-50
            top-[30%]
            h-125
            w-125
            rounded-full
            bg-orange-500/10
            blur-3xl
          "
        />
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
          className="
            absolute
            -bottom-50
            left-[30%]
            h-125
            w-125
            rounded-full
            bg-purple-600/10
            blur-3xl
          "
        />
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-100
            w-100
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-pink-500/5
            blur-3xl
          "
        />
      </div>
      <Navbar />
      <main>
        <Hero />
        <motion.section
          id="about"
          {...sectionAnimation}
        >
          <About />
        </motion.section>
        <motion.section
          id="skills"
          {...sectionAnimation}
        >
          <Skills />
        </motion.section>
        <motion.section
          id="projects"
          {...sectionAnimation}
        >
          <Projects />
        </motion.section>
        <motion.section
          id="education"
          {...sectionAnimation}
        >
          <Education />
        </motion.section>
        <motion.section
          id="contact"
          {...sectionAnimation}
        >
          <Contact />
        </motion.section>
      </main>
      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/5
                  "
                >
                  <span
                    className="
                      bg-gradient-to-r
                      from-pink-500
                      to-orange-400
                      bg-clip-text
                      text-lg
                      font-bold
                      text-transparent
                    "
                  >
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
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <a
                href="#home"
                className="transition hover:text-pink-400"
              >
                Home
              </a>
              <a
                href="#about"
                className="transition hover:text-pink-400"
              >
                About
              </a>
              <a
                href="#projects"
                className="transition hover:text-pink-400"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="transition hover:text-pink-400"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="my-8 h-px bg-white/5" />
          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-3
              text-sm
              text-slate-600
              md:flex-row
            "
          >
            <p>
              © {new Date().getFullYear()} Srikar Malla. All rights reserved.
            </p>
            <p>
              Built with React + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
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
              rotate: -5,
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
              transition-all
              duration-300
              hover:border-pink-500/50
              hover:bg-pink-500/10
              hover:text-pink-400
              hover:shadow-lg
              hover:shadow-pink-500/20
            "
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/characters"
        element={
          <Suspense fallback={<UniverseLoadingFallback />}>
            <CharacterUniverse />
          </Suspense>
        }
      />
      <Route
        path="/reply"
        element={
          <Suspense fallback={<PageLoadingFallback />}>
            <Reply />
          </Suspense>
        }
      />
      <Route
        path="/SendWise"
        element={<ExternalRedirect url="https://spend-wise-expense-tracker-brown.vercel.app" />}
      />
      <Route
        path="/sendwise"
        element={<ExternalRedirect url="https://spend-wise-expense-tracker-brown.vercel.app" />}
      />
      <Route
        path="/SpendWise"
        element={<ExternalRedirect url="https://spend-wise-expense-tracker-brown.vercel.app" />}
      />
      <Route
        path="/spendwise"
        element={<ExternalRedirect url="https://spend-wise-expense-tracker-brown.vercel.app" />}
      />
    </Routes>
  )
}
