import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = links
        .map((link) => document.querySelector(link.href))
        .filter(Boolean)

      let currentSection = 'home'

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140

        if (window.scrollY >= sectionTop) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeMenu = () => {
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? 'border-b border-white/10 bg-[#080816]/80 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'bg-transparent'
        }
      `}
    >

      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

        {/* =========================================
            LOGO
        ========================================== */}

        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >

          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-white/20
              bg-white/5
              p-1
              transition
              duration-300
              group-hover:scale-105
              group-hover:border-pink-500/40
            "
          >

            <img
              src="/mylogo.png"
              alt="Srikar Malla logo"
              className="h-full w-full rounded-full object-cover"
            />

          </div>


          <div className="hidden sm:block">

            <p className="text-sm font-semibold text-white">
              Srikar Malla
            </p>

            <p className="text-[11px] text-slate-500">
              Developer • CSE
            </p>

          </div>

        </a>


        {/* =========================================
            DESKTOP NAVIGATION
        ========================================== */}

        <div className="hidden items-center gap-1 md:flex">

          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1)

            return (
              <a
                key={link.name}
                href={link.href}
                className={`
                  relative
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }
                `}
              >

                {link.name}

                {/* Active underline */}

                {isActive && (
                  <motion.span
                    layoutId="navbar-active"
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-0.5
                      w-5
                      -translate-x-1/2
                      rounded-full
                      bg-gradient-to-r
                      from-pink-500
                      to-orange-400
                    "
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

              </a>
            )
          })}

        </div>


        {/* =========================================
            RESUME BUTTON
        ========================================== */}

        <a
          href="/resume.pdf"
          download
          className="
            hidden
            rounded-lg
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-sm
            font-medium
            text-slate-200
            backdrop-blur
            transition
            hover:border-pink-500/30
            hover:bg-white/10
            md:block
          "
        >
          Resume
        </a>


        {/* =========================================
            MOBILE BUTTON
        ========================================== */}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            bg-white/5
            text-lg
            text-white
            transition
            hover:bg-white/10
            md:hidden
          "
        >
          {open ? '✕' : '☰'}
        </button>

      </nav>


      {/* =========================================
          MOBILE MENU
      ========================================== */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              overflow-hidden
              border-t
              border-white/10
              bg-[#080816]/95
              backdrop-blur-xl
              md:hidden
            "
          >

            <div className="mx-auto max-w-6xl px-6 py-5">

              <div className="flex flex-col gap-2">

                {links.map((link, index) => {
                  const isActive =
                    activeSection === link.href.substring(1)

                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      className={`
                        rounded-lg
                        px-4
                        py-3
                        text-sm
                        transition
                        ${
                          isActive
                            ? 'bg-white/5 text-white'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      {link.name}
                    </motion.a>
                  )
                })}


                {/* Mobile Resume */}

                <a
                  href="/resume.pdf"
                  download
                  onClick={closeMenu}
                  className="
                    mt-2
                    rounded-lg
                    border
                    border-pink-500/20
                    bg-gradient-to-r
                    from-pink-500/10
                    to-orange-400/10
                    px-4
                    py-3
                    text-center
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  Download Resume
                </a>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.header>
  )
}