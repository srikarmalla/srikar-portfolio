import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'Computer Science Student',
  'Full Stack Developer',
  'React Developer',
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

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-6 pt-24"
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
          className="absolute left-[10%] top-[15%] h-64 w-64 rounded-full bg-pink-500/10 blur-3xl"
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
          className="absolute right-[10%] top-[30%] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
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
          className="absolute bottom-[10%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl"
        />

      </div>


      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center">

        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.4fr_0.6fr]">


          {/* =====================================
              LEFT SIDE
          ====================================== */}

          <div className="text-center lg:text-left">

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
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2
                  text-sm
                  text-slate-300
                  backdrop-blur-md
                "
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                Available for opportunities
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
                text-5xl
                font-bold
                leading-tight
                tracking-tight
                sm:text-6xl
                lg:text-7xl
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
                Malla.
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
              className="mt-7 min-h-10 text-xl text-slate-300 sm:text-2xl"
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
                text-base
                leading-8
                text-slate-400
                sm:text-lg
                lg:mx-0
              "
            >
              Computer Science Engineering student passionate about
              building modern web applications, solving problems and
              turning ideas into real-world projects.
            </motion.p>


            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.7,
              }}
              className="
                mt-9
                flex
                flex-col
                justify-center
                gap-4
                sm:flex-row
                lg:justify-start
              "
            >

              {/* Projects */}

              <a
                href="#projects"
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-pink-500
                  to-orange-400
                  px-7
                  py-3.5
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-pink-500/20
                  transition
                  hover:scale-105
                  hover:shadow-pink-500/30
                "
              >
                View My Projects →
              </a>


              {/* Resume */}

              <a
                href="/resume.pdf"
                download
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  px-7
                  py-3.5
                  font-semibold
                  text-slate-200
                  backdrop-blur-md
                  transition
                  hover:border-white/20
                  hover:bg-white/10
                  hover:scale-105
                "
              >
                Download Resume
              </a>

            </motion.div>


            {/* Social Links */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.4,
                duration: 0.7,
              }}
              className="
                mt-9
                flex
                items-center
                justify-center
                gap-6
                text-sm
                lg:justify-start
              "
            >

              <a
                href="https://github.com/srikarmalla"
                target="_blank"
                rel="noreferrer"
                className="
                  text-slate-500
                  transition
                  hover:text-white
                "
              >
                GitHub ↗
              </a>


              <span className="text-slate-700">
                /
              </span>


              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="
                  text-slate-500
                  transition
                  hover:text-white
                "
              >
                LinkedIn ↗
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
            className="hidden justify-center lg:flex"
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
              className="relative"
            >

              {/* Outer glow */}

              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-orange-400/30 blur-3xl" />


              {/* Logo */}

              <div
                className="
                  relative
                  flex
                  h-72
                  w-72
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  p-5
                  shadow-2xl
                  backdrop-blur-md
                "
              >

                <img
                  src="/mylogo.png"
                  alt="Srikar Malla logo"
                  className="
                    h-full
                    w-full
                    rounded-full
                    object-cover
                  "
                />

              </div>


              {/* Decorative ring */}

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
                  absolute
                  -inset-5
                  rounded-full
                  border
                  border-dashed
                  border-pink-500/20
                "
              />

            </motion.div>

          </motion.div>

        </div>

      </div>


      {/* =========================================
          SCROLL INDICATOR
      ========================================== */}

      <motion.a
        href="#about"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          text-center
          text-xs
          text-slate-600
          transition
          hover:text-slate-400
        "
      >
        <span className="block mb-2">
          Scroll to explore
        </span>

        <span className="text-lg">
          ↓
        </span>
      </motion.a>

    </section>
  )
}