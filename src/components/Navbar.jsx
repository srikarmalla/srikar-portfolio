import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Education', id: 'education' },
  { name: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const [logoHovered, setLogoHovered] = useState(false)
  const [enteringUniverse, setEnteringUniverse] = useState(false)

  const [showDiscovery, setShowDiscovery] = useState(true)
  const [discoveryStage, setDiscoveryStage] = useState(0)

  const hideDiscoveryTimer = useRef(null)
  const hoverDiscoveryTimer = useRef(null)
  const navigationTimer = useRef(null)

  // =========================================================
  // SCROLL / ACTIVE SECTION
  // =========================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks
        .map((link) => document.getElementById(link.id))
        .filter(Boolean)

      let current = 'home'

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()

        if (rect.top <= 180) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // =========================================================
  // INITIAL DISCOVERY MESSAGE
  // =========================================================

  useEffect(() => {
    const stageTimer = setTimeout(() => {
      setDiscoveryStage(1)
    }, 3500)

    const hideTimer = setTimeout(() => {
      setShowDiscovery(false)
    }, 7500)

    return () => {
      clearTimeout(stageTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  // =========================================================
  // CLEANUP TIMERS
  // =========================================================

  useEffect(() => {
    return () => {
      if (hideDiscoveryTimer.current) {
        clearTimeout(hideDiscoveryTimer.current)
      }

      if (hoverDiscoveryTimer.current) {
        clearTimeout(hoverDiscoveryTimer.current)
      }

      if (navigationTimer.current) {
        clearTimeout(navigationTimer.current)
      }
    }
  }, [])

  // =========================================================
  // SCROLL TO SECTION
  // =========================================================

  const scrollToSection = (id) => {
    setOpen(false)

    const section = document.getElementById(id)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // =========================================================
  // LOGO HOVER
  // =========================================================

  const handleLogoEnter = () => {
    setLogoHovered(true)

    if (enteringUniverse) return

    setShowDiscovery(true)
    setDiscoveryStage(1)

    if (hoverDiscoveryTimer.current) {
      clearTimeout(hoverDiscoveryTimer.current)
    }

    hoverDiscoveryTimer.current = setTimeout(() => {
      setShowDiscovery(false)
    }, 4000)
  }

  const handleLogoLeave = () => {
    setLogoHovered(false)
  }

  // =========================================================
  // ENTER CHARACTER UNIVERSE
  // =========================================================

  const enterUniverse = (event) => {
    if (event) {
      event.preventDefault()
    }

    if (enteringUniverse) return

    setOpen(false)
    setShowDiscovery(false)
    setLogoHovered(false)
    setEnteringUniverse(true)

    /*
      IMPORTANT:
      Keep this shorter than before.

      Old:
      1400ms

      New:
      1100ms

      This makes the portal feel like a transition
      instead of a full-screen loading screen.
    */

    navigationTimer.current = setTimeout(() => {
      navigate('/characters')
    }, 1100)
  }

  // =========================================================
  // MOBILE CHARACTER UNIVERSE
  // =========================================================

  const handleMobileUniverse = () => {
    enterUniverse()
  }

  return (
    <>
      {/* =====================================================
          PORTAL TRANSITION
      ====================================================== */}

      <AnimatePresence>
        {enteringUniverse && (
          <motion.div
            className="
              fixed
              inset-0
              z-[99999]
              pointer-events-none
              overflow-hidden
              bg-[#020208]
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* =================================================
                DARK BACKGROUND
            ================================================== */}

            <motion.div
              className="absolute inset-0 bg-[#020208]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.98 }}
              transition={{ duration: 0.35 }}
            />

            {/* =================================================
                SOFT AMBIENT GLOW
            ================================================== */}

            <motion.div
              className="
                absolute
                left-1/2
                top-[80px]
                -translate-x-1/2
                rounded-full
                bg-violet-600/30
                blur-[80px]
              "
              initial={{
                width: 40,
                height: 40,
                opacity: 0,
              }}
              animate={{
                width: [40, 180, 420, 850],
                height: [40, 180, 420, 850],
                opacity: [0, 0.9, 0.65, 0],
              }}
              transition={{
                duration: 1.1,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* =================================================
                MAIN PORTAL
            ================================================== */}

            <motion.div
              className="
                absolute
                left-1/2
                top-[80px]
                -translate-x-1/2
                rounded-full
                bg-gradient-to-br
                from-violet-500
                via-fuchsia-500
                to-cyan-400
                blur-[3px]
              "
              initial={{
                width: 40,
                height: 40,
                opacity: 0,
              }}
              animate={{
                width: [40, 130, 360, 800, 1500],
                height: [40, 130, 360, 800, 1500],
                opacity: [0, 1, 1, 0.9, 0],
              }}
              transition={{
                duration: 1.08,
                times: [0, 0.15, 0.4, 0.75, 1],
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* =================================================
                INNER DARK PORTAL
            ================================================== */}

            <motion.div
              className="
                absolute
                left-1/2
                top-[80px]
                -translate-x-1/2
                rounded-full
                bg-[#03030a]
                shadow-[0_0_80px_rgba(139,92,246,0.75)]
              "
              initial={{
                width: 18,
                height: 18,
              }}
              animate={{
                width: [18, 90, 300, 720, 1450],
                height: [18, 90, 300, 720, 1450],
              }}
              transition={{
                duration: 1.05,
                times: [0, 0.18, 0.42, 0.75, 1],
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* =================================================
                PORTAL RINGS
            ================================================== */}

            {[0, 1, 2].map((ring) => (
              <motion.div
                key={ring}
                className="
                  absolute
                  left-1/2
                  top-[80px]
                  -translate-x-1/2
                  rounded-full
                  border
                  border-violet-300/50
                "
                initial={{
                  width: 55 + ring * 25,
                  height: 55 + ring * 25,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  width: [55 + ring * 25, 180, 480, 950, 1500],
                  height: [55 + ring * 25, 180, 480, 950, 1500],
                  opacity: [0, 0.9, 0.65, 0.25, 0],
                  rotate: ring % 2 === 0 ? 180 : -180,
                }}
                transition={{
                  duration: 1.08,
                  delay: ring * 0.04,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* =================================================
                PORTAL LIGHT STREAKS
            ================================================== */}

            {[...Array(12)].map((_, index) => {
              const angle = index * 30

              return (
                <motion.span
                  key={index}
                  className="
                    absolute
                    left-1/2
                    top-[80px]
                    h-[2px]
                    w-20
                    origin-left
                    rounded-full
                    bg-gradient-to-r
                    from-violet-300
                    to-transparent
                  "
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                  initial={{
                    scaleX: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scaleX: [0, 1, 2],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.025,
                    ease: 'easeOut',
                  }}
                />
              )
            })}

            {/* =================================================
                PORTAL PARTICLES
            ================================================== */}

            {[...Array(24)].map((_, index) => {
              const angle = index * 15
              const distance = 180 + (index % 5) * 90

              return (
                <motion.span
                  key={index}
                  className="
                    absolute
                    left-1/2
                    top-[80px]
                    h-1
                    w-1
                    rounded-full
                    bg-violet-200
                    shadow-[0_0_8px_rgba(167,139,250,0.9)]
                  "
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.018,
                    ease: 'easeOut',
                  }}
                />
              )
            })}

            {/* =================================================
                ENTERING TEXT
            ================================================== */}

            <motion.div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1.02, 1.08],
              }}
              transition={{
                duration: 1.05,
                times: [0, 0.22, 0.7, 1],
              }}
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.5em]
                  text-violet-300
                  md:text-xs
                "
              >
                Entering
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                  md:text-5xl
                "
              >
                Character Universe
              </h2>

              <p className="mt-3 text-xs text-white/45 md:text-sm">
                Welcome to another side of Srikar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <motion.nav
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className={`
          fixed
          left-0
          right-0
          top-0
          z-[100]
          transition-all
          duration-300
          ${
            scrolled
              ? 'border-b border-white/10 bg-[#080816]/80 backdrop-blur-xl'
              : 'bg-transparent'
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-5
            md:px-8
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className="relative flex items-center">
            {/* =================================================
                DISCOVERY CLOUD
            ================================================== */}

            <AnimatePresence>
              {showDiscovery && !enteringUniverse && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                    x: -15,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: [0, -5, 0],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    x: -20,
                    y: -20,
                  }}
                  transition={{
                    opacity: {
                      duration: 0.45,
                    },
                    scale: {
                      duration: 0.45,
                    },
                    x: {
                      duration: 0.45,
                    },
                    y: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  className="
                    absolute
                    left-0
                    top-[68px]
                    z-[200]
                    w-[230px]
                    md:w-[255px]
                  "
                >
                  {/* CLOUD */}

                  <motion.div
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(124,58,237,.95), rgba(59,130,246,.95))',
                        'linear-gradient(135deg, rgba(236,72,153,.95), rgba(124,58,237,.95))',
                        'linear-gradient(135deg, rgba(6,182,212,.95), rgba(124,58,237,.95))',
                        'linear-gradient(135deg, rgba(124,58,237,.95), rgba(59,130,246,.95))',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="
                      relative
                      rounded-[28px]
                      border
                      border-white/25
                      px-5
                      py-4
                      shadow-2xl
                      shadow-violet-500/30
                      backdrop-blur-xl
                    "
                  >
                    {/* CLOUD TEXT */}

                    <AnimatePresence mode="wait">
                      <motion.p
                        key={discoveryStage}
                        initial={{
                          opacity: 0,
                          y: 10,
                          filter: 'blur(4px)',
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                          filter: 'blur(4px)',
                        }}
                        transition={{
                          duration: 0.45,
                        }}
                        className="
                          text-center
                          text-xs
                          font-medium
                          leading-relaxed
                          text-white
                          md:text-sm
                        "
                      >
                        {discoveryStage === 0
                          ? "✦ There's another world here..."
                          : '✦ Tap my logo to enter'}
                      </motion.p>
                    </AnimatePresence>

                    {/* CLOUD BUBBLES */}

                    <motion.span
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="
                        absolute
                        -left-1
                        -top-4
                        h-6
                        w-6
                        rounded-full
                        bg-violet-500/90
                        shadow-lg
                        shadow-violet-500/40
                      "
                    />

                    <motion.span
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                      className="
                        absolute
                        left-5
                        -top-7
                        h-3
                        w-3
                        rounded-full
                        bg-fuchsia-400
                      "
                    />

                    <motion.span
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                      className="
                        absolute
                        right-7
                        -top-3
                        h-4
                        w-4
                        rounded-full
                        bg-cyan-400/80
                      "
                    />

                    {/* ARROW */}

                    <motion.div
                      animate={{
                        y: [0, 4, 0],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                      }}
                      className="
                        absolute
                        -bottom-9
                        left-9
                        text-xl
                        text-violet-300
                      "
                    >
                      ↓
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                LOGO PORTAL
            ================================================== */}

            <Link
              to="/characters"
              onClick={enterUniverse}
              onMouseEnter={handleLogoEnter}
              onMouseLeave={handleLogoLeave}
              className="
                relative
                z-[201]
                block
                rounded-full
              "
              aria-label="Enter Character Universe"
            >
              <motion.div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  md:h-14
                  md:w-14
                "
                whileHover={{
                  scale: 1.2,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {/* OUTER GLOW */}

                <motion.div
                  className="
                    absolute
                    inset-[-9px]
                    rounded-full
                    bg-gradient-to-r
                    from-violet-500
                    via-fuchsia-500
                    to-cyan-400
                    opacity-50
                    blur-md
                  "
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* OUTER RING */}

                <motion.div
                  className="
                    absolute
                    inset-[-5px]
                    rounded-full
                    border-2
                    border-dashed
                    border-violet-400/80
                  "
                  animate={
                    logoHovered
                      ? {
                          rotate: 360,
                        }
                      : {
                          rotate: 0,
                        }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: logoHovered ? Infinity : 0,
                    ease: 'linear',
                  }}
                />

                {/* SECOND RING */}

                <motion.div
                  className="
                    absolute
                    inset-[-2px]
                    rounded-full
                    border
                    border-cyan-300/30
                  "
                  animate={
                    logoHovered
                      ? {
                          rotate: -360,
                        }
                      : {
                          rotate: 0,
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: logoHovered ? Infinity : 0,
                    ease: 'linear',
                  }}
                />

                {/* LOGO */}

                <motion.img
                  src="/mylogo.png"
                  alt="Srikar Malla"
                  className="
                    relative
                    z-10
                    h-10
                    w-10
                    rounded-full
                    border-2
                    border-white
                    object-cover
                    shadow-lg
                    shadow-violet-500/30
                    md:h-12
                    md:w-12
                  "
                  animate={
                    logoHovered
                      ? {
                          rotate: -360,
                        }
                      : {
                          rotate: 0,
                        }
                  }
                  transition={{
                    duration: 1.4,
                    repeat: logoHovered ? Infinity : 0,
                    ease: 'linear',
                  }}
                />

                {/* SHINE */}

                <motion.div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-20
                    rounded-full
                    bg-gradient-to-br
                    from-white/40
                    via-transparent
                    to-transparent
                  "
                  animate={
                    logoHovered
                      ? {
                          opacity: [0, 0.5, 0],
                          rotate: 360,
                        }
                      : {
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: logoHovered ? Infinity : 0,
                  }}
                />
              </motion.div>
            </Link>

            {/* =================================================
                NAME
            ================================================== */}

            <motion.div
              className="ml-4 hidden md:block"
              initial="rest"
              whileHover="hover"
            >
              <div className="text-sm font-semibold text-white">
                Srikar Malla
              </div>

              <div className="relative h-4 overflow-hidden text-xs">
                <motion.span
                  variants={{
                    rest: {
                      y: 0,
                      opacity: 1,
                    },
                    hover: {
                      y: -18,
                      opacity: 0,
                    },
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute text-white/50"
                >
                  CSE Student
                </motion.span>

                <motion.span
                  variants={{
                    rest: {
                      y: 18,
                      opacity: 0,
                    },
                    hover: {
                      y: 0,
                      opacity: 1,
                    },
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute text-violet-300"
                >
                  Developer • CSE
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`
                  relative
                  text-sm
                  transition-colors
                  ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-white/55 hover:text-white'
                  }
                `}
              >
                {link.name}

                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="
                      absolute
                      -bottom-2
                      left-0
                      right-0
                      mx-auto
                      h-[2px]
                      rounded-full
                      bg-gradient-to-r
                      from-violet-400
                      to-cyan-400
                    "
                  />
                )}
              </button>
            ))}

            {/* RESUME */}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full
                border
                border-violet-400/40
                px-5
                py-2
                text-sm
                text-violet-200
                transition-all
                duration-300
                hover:border-violet-300
                hover:bg-violet-500/10
                hover:text-white
                hover:shadow-lg
                hover:shadow-violet-500/10
              "
            >
              Resume
            </a>
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}

          <button
            onClick={() => setOpen(!open)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              lg:hidden
            "
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <motion.span
                animate={
                  open
                    ? {
                        rotate: 45,
                        y: 7,
                      }
                    : {
                        rotate: 0,
                        y: 0,
                      }
                }
                className="block h-0.5 w-5 bg-white"
              />

              <motion.span
                animate={
                  open
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 1,
                      }
                }
                className="block h-0.5 w-5 bg-white"
              />

              <motion.span
                animate={
                  open
                    ? {
                        rotate: -45,
                        y: -7,
                      }
                    : {
                        rotate: 0,
                        y: 0,
                      }
                }
                className="block h-0.5 w-5 bg-white"
              />
            </div>
          </button>
        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

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
                lg:hidden
              "
            >
              <div className="flex flex-col px-6 py-5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="
                      border-b
                      border-white/5
                      py-4
                      text-left
                      text-sm
                      text-white/70
                      transition-colors
                      hover:text-white
                    "
                  >
                    {link.name}
                  </button>
                ))}

                {/* CHARACTER UNIVERSE */}

                <button
                  onClick={handleMobileUniverse}
                  className="
                    mt-4
                    rounded-xl
                    border
                    border-violet-400/30
                    bg-gradient-to-r
                    from-violet-500/10
                    to-cyan-500/10
                    px-4
                    py-3
                    text-left
                    text-sm
                    text-violet-200
                    transition-all
                    hover:border-violet-300/50
                    hover:bg-violet-500/20
                  "
                >
                  ✦ Enter Character Universe
                </button>

                {/* RESUME */}

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-3
                    rounded-xl
                    bg-white/5
                    px-4
                    py-3
                    text-sm
                    text-white/70
                    transition-colors
                    hover:bg-white/10
                    hover:text-white
                  "
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}