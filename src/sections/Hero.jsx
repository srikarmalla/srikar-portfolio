import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'Computer Science Student',
  'Full Stack Developer',
  'Creative Technologist',
  'Problem Solver',
  'Tech Enthusiast',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 50 : 90

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1))

        if (text === currentRole) {
          setTimeout(() => {
            setIsDeleting(true)
          }, 1400)
        }
      } else {
        setText(currentRole.substring(0, text.length - 1))

        if (text === '') {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, roleIndex])

  // Smoothly scroll to About
  const scrollToAbout = (e) => {
    e.preventDefault()

    const aboutSection = document.getElementById('about')

    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        px-5
        pt-24
        sm:px-6
      "
    >

      {/* =========================================
          BACKGROUND DECORATION
      ========================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Pink glow */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            left-[5%]
            top-[15%]
            h-48
            w-48
            rounded-full
            bg-pink-500/10
            blur-3xl
            sm:h-64
            sm:w-64
          "
        />

        {/* Orange glow */}
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            right-[5%]
            top-[30%]
            h-56
            w-56
            rounded-full
            bg-orange-500/10
            blur-3xl
            sm:h-72
            sm:w-72
          "
        />

        {/* Purple glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            bottom-[10%]
            left-1/2
            h-56
            w-56
            -translate-x-1/2
            rounded-full
            bg-purple-500/10
            blur-3xl
            sm:h-64
            sm:w-64
          "
        />

      </div>


      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-6rem)]
          max-w-6xl
          items-center
          py-12
          sm:py-16
        "
      >

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            gap-12
            md:gap-16
            lg:grid-cols-[1.25fr_0.75fr]
            lg:gap-10
            xl:grid-cols-[1.35fr_0.65fr]
          "
        >

          {/* =====================================
              LEFT SIDE
          ====================================== */}

          <div className="min-w-0 text-center lg:text-left">

            {/* Greeting */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span
                className="
                  inline-flex
                  max-w-full
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-2
                  text-xs
                  text-slate-300
                  backdrop-blur-md
                  sm:px-4
                  sm:text-sm
                "
              >
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-400" />

                <span>Available for opportunities</span>
              </span>
            </motion.div>


            {/* Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                sm:text-5xl
                md:text-6xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              Hi, I'm{' '}

              <span
                className="
                  bg-gradient-to-r
                  from-pink-500
                  via-red-500
                  to-orange-400
                  bg-clip-text
                  text-transparent
                "
              >
                Srikar
              </span>

              <br />

              <span className="text-white">
                Malla
              </span>
            </motion.h1>


            {/* Typing Animation */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
              }}
              className="
                mt-6
                min-h-10
                text-lg
                text-slate-300
                sm:mt-7
                sm:text-xl
                md:text-2xl
              "
            >
              <span className="text-slate-400">
                I'm a{' '}
              </span>

              <span className="font-semibold text-white">
                {text}
              </span>

              <span className="ml-1 animate-pulse text-pink-400">
                |
              </span>
            </motion.div>


            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9,
                duration: 0.7,
              }}
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-sm
                leading-7
                text-slate-400
                sm:text-base
                sm:leading-8
                md:text-lg
                lg:mx-0
              "
            >
              Computer Science Engineering student passionate about
              building modern web applications, solving problems and
              turning ideas into real-world projects.
            </motion.p>


            {/* =====================================
                BUTTONS
            ====================================== */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.7,
              }}
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
                sm:flex-wrap
                lg:justify-start
              "
            >

              {/* PROJECT BUTTON */}

              <a
                href="#projects"
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-pink-500
                  to-orange-400
                  px-6
                  py-3.5
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-pink-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:from-pink-400
                  hover:via-red-400
                  hover:to-orange-300
                  hover:shadow-xl
                  hover:shadow-pink-500/40
                  sm:w-auto
                "
              >
                <span>
                  View My Projects
                </span>

                <span
                  className="
                    ml-2
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  ↓
                </span>
              </a>


              {/* RESUME BUTTON */}

              <a
                href="/resume.pdf"
                download
                className="
                  group
                  relative
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-pink-500/20
                  bg-white/5
                  px-6
                  py-3.5
                  font-semibold
                  text-slate-200
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-pink-400/60
                  hover:bg-pink-500/10
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-pink-500/30
                  sm:w-auto
                "
              >

                {/* Animated hover glow */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-10
                    bg-gradient-to-r
                    from-pink-500/20
                    via-red-500/20
                    to-orange-400/20
                    opacity-0
                    blur-xl
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                <span>
                  Download Resume
                </span>

              

              </a>

            </motion.div>


            {/* =====================================
                SOCIAL LINKS
            ====================================== */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.4,
                duration: 0.7,
              }}
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-3
                text-sm
                lg:justify-start
              "
            >

              {/* GitHub */}

              <a
                href="https://github.com/srikarmalla"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  rounded-lg
                  px-2
                  py-1
                  text-slate-500
                  transition-all
                  duration-300
                  hover:bg-white/5
                  hover:text-white
                  hover:shadow-[0_0_20px_rgba(236,72,153,0.20)]
                "
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  GitHub
                </span>

                <span
                  className="
                    ml-1
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-pink-400
                  "
                >
                  ↗
                </span>
              </a>


              {/* Divider */}

              <span className="hidden text-slate-700 sm:block">
                /
              </span>


              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/srikar-malla/"
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  rounded-lg
                  px-2
                  py-1
                  text-slate-500
                  transition-all
                  duration-300
                  hover:bg-white/5
                  hover:text-white
                  hover:shadow-[0_0_20px_rgba(59,130,246,0.20)]
                "
              >
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  LinkedIn
                </span>

                <span
                  className="
                    ml-1
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-blue-400
                  "
                >
                  ↗
                </span>
              </a>

            </motion.div>

          </div>


          {/* =====================================
              RIGHT SIDE — LOGO
          ====================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            className="
              flex
              justify-center
              lg:justify-end
            "
          >

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                relative
                scale-[0.78]
                sm:scale-[0.88]
                md:scale-100
                lg:scale-[0.88]
                xl:scale-100
              "
            >

              {/* Outer glow */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-gradient-to-r
                  from-pink-500/30
                  via-purple-500/20
                  to-orange-400/30
                  blur-3xl
                  transition-all
                  duration-500
                "
              />


              {/* Logo container */}

              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 12,
                }}
                className="
                  group
                  relative
                  flex
                  h-64
                  w-64
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  p-4
                  shadow-2xl
                  backdrop-blur-md
                  transition-all
                  duration-500
                  hover:border-pink-400/60
                  hover:bg-pink-500/5
                  hover:shadow-[0_0_80px_rgba(236,72,153,0.30)]
                  sm:h-72
                  sm:w-72
                  sm:p-5
                  lg:h-64
                  lg:w-64
                  xl:h-72
                  xl:w-72
                "
              >

                <img
                  src="/srikarmalla.png"
                  alt="Srikar Malla"
                  className="
                    h-full
                    w-full
                    rounded-full
                    object-cover
                    transition-all
                    duration-500
                    group-hover:brightness-110
                    group-hover:saturate-125
                  "
                />

                {/* Hover color overlay */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    bg-gradient-to-tr
                    from-pink-500/25
                    via-transparent
                    to-orange-400/25
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

              </motion.div>


              {/* Rotating decorative ring */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="
                  pointer-events-none
                  absolute
                  -inset-4
                  rounded-full
                  border
                  border-dashed
                  border-pink-500/25
                  sm:-inset-5
                "
              />

            </motion.div>

          </motion.div>

        </div>
      </div>


      {/* =========================================
          SCROLL TO EXPLORE
          IMPORTANT:
          Mobile/tablet = normal flow
          Desktop = absolute bottom
      ========================================== */}

      <motion.a
        href="#about"
        onClick={scrollToAbout}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          group
          relative
          z-30
          mx-auto
          mt-2
          mb-8
          flex
          w-fit
          flex-col
          items-center
          text-center
          text-xs
          text-slate-600
          transition-all
          duration-300
          hover:text-pink-400

          lg:absolute
          lg:bottom-7
          lg:left-1/2
          lg:mb-0
          lg:-translate-x-1/2
        "
      >

        <span
          className="
            mb-2
            whitespace-nowrap
            transition-colors
            duration-300
            group-hover:text-pink-400
          "
        >
          Scroll to explore
        </span>

        <span
          className="
            text-lg
            transition-all
            duration-300
            group-hover:translate-y-1
            group-hover:text-orange-400
          "
        >
          ↓
        </span>

      </motion.a>

    </section>
  )
}