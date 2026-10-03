import { useEffect, useState } from 'react'



import { motion, AnimatePresence } from 'framer-motion'



import { Routes, Route } from 'react-router-dom'



import CharacterUniverse from './pages/CharacterUniverse'



import Navbar from './components/Navbar'



import Hero from './sections/Hero'

import About from './sections/About'

import Skills from './sections/Skills'

import Projects from './sections/Projects'

import Education from './sections/Education'

import Contact from './sections/Contact'



import Reply from './pages/Reply'





/* =========================================================

   HOME PAGE

========================================================= */



function HomePage() {

  const [scrollProgress, setScrollProgress] = useState(0)

  const [isLoading, setIsLoading] = useState(true)





  /* =====================================================

     PAGE LOADING

  ====================================================== */



  useEffect(() => {

    const timer = setTimeout(() => {

      setIsLoading(false)

    }, 2200)



    return () => {

      clearTimeout(timer)

    }

  }, [])





  /* =====================================================

     SCROLL PROGRESS

  ====================================================== */



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



    window.addEventListener('scroll', handleScroll, {

      passive: true,

    })



    return () => {

      window.removeEventListener('scroll', handleScroll)

    }

  }, [])





  /* =====================================================

     SECTION ANIMATION

  ====================================================== */



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

          PAGE LOADER

      ====================================================== */}



      <AnimatePresence>

        {isLoading && (

          <motion.div

            initial={{

              opacity: 1,

            }}

            exit={{

              opacity: 0,

            }}

            transition={{

              duration: 0.8,

              ease: 'easeInOut',

            }}

            className="

              fixed

              inset-0

              z-[9999]

              flex

              items-center

              justify-center

              overflow-hidden

              bg-[#080816]/85

              backdrop-blur-xl

            "

          >



            {/* =================================================

                LOADER BACKGROUND GLOWS

            ================================================== */}



            <div className="pointer-events-none absolute inset-0">



              {/* Center Pink Glow */}



              <div

                className="

                  absolute

                  left-1/2

                  top-1/2

                  h-96

                  w-96

                  -translate-x-1/2

                  -translate-y-1/2

                  rounded-full

                  bg-pink-500/10

                  blur-3xl

                "

              />





              {/* Purple Glow */}



              <div

                className="

                  absolute

                  left-[20%]

                  top-[20%]

                  h-64

                  w-64

                  rounded-full

                  bg-purple-500/10

                  blur-3xl

                "

              />





              {/* Orange Glow */}



              <div

                className="

                  absolute

                  bottom-[15%]

                  right-[15%]

                  h-64

                  w-64

                  rounded-full

                  bg-orange-500/10

                  blur-3xl

                "

              />



            </div>





            {/* =================================================

                LOADING LOGO

            ================================================== */}



            <motion.div

              initial={{

                opacity: 0,

                scale: 0.65,

                rotate: -10,

              }}

              animate={{

                opacity: 1,

                scale: 1,

                rotate: 0,

              }}

              transition={{

                duration: 0.9,

                ease: 'easeOut',

              }}

              className="relative z-10"

            >



              {/* Glow */}



              <div

                className="

                  absolute

                  inset-0

                  rounded-full

                  bg-gradient-to-r

                  from-pink-500/40

                  via-purple-500/30

                  to-orange-400/40

                  blur-3xl

                "

              />





              {/* Rotating Ring */}



              <motion.div

                animate={{

                  rotate: 360,

                }}

                transition={{

                  duration: 8,

                  repeat: Infinity,

                  ease: 'linear',

                }}

                className="

                  absolute

                  -inset-5

                  rounded-full

                  border

                  border-dashed

                  border-pink-500/40

                "

              />





              {/* Logo */}



              <motion.img

                src="/srikarmalla.png"

                alt="Srikar Malla"

                animate={{

                  scale: [1, 1.04, 1],

                }}

                transition={{

                  duration: 2,

                  repeat: Infinity,

                  ease: 'easeInOut',

                }}

                className="

                  relative

                  h-36

                  w-36

                  rounded-full

                  border

                  border-white/20

                  object-cover

                  shadow-2xl

                  shadow-pink-500/20

                  sm:h-44

                  sm:w-44

                  md:h-52

                  md:w-52

                "

              />



            </motion.div>





            {/* =================================================

                LOADING TEXT

            ================================================== */}



            <motion.div

              initial={{

                opacity: 0,

                y: 15,

              }}

              animate={{

                opacity: 1,

                y: 0,

              }}

              transition={{

                delay: 0.5,

                duration: 0.6,

              }}

              className="

                absolute

                bottom-[18%]

                left-0

                right-0

                z-10

                text-center

              "

            >



              <p className="text-sm font-medium tracking-[0.25em] text-slate-300">

                SRIKAR MALLA

              </p>



              <p className="mt-2 text-xs tracking-widest text-slate-600">

                DEVELOPER • CSE

              </p>



            </motion.div>



          </motion.div>

        )}

      </AnimatePresence>





      {/* =====================================================

          SCROLL PROGRESS

      ====================================================== */}



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





      {/* =====================================================

          BACKGROUND

      ====================================================== */}



      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">



        {/* =================================================

            GRID

        ================================================== */}



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





        {/* =================================================

            PINK GLOW

        ================================================== */}



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





        {/* =================================================

            ORANGE GLOW

        ================================================== */}



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





        {/* =================================================

            PURPLE GLOW

        ================================================== */}



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





        {/* =================================================

            CENTER GLOW

        ================================================== */}



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





      {/* =====================================================

          NAVBAR



          IMPORTANT:



          Navbar is INSIDE HomePage.



          Therefore when React changes from:



              /



          to:



              /characters



          Navbar completely unmounts.



          This prevents the Character Universe from being

          covered by the previous portal transition.

      ====================================================== */}



      <Navbar />





      {/* =====================================================

          MAIN CONTENT

      ====================================================== */}



      <main>



        {/* =================================================

            HERO

        ================================================== */}



        <Hero />





        {/* =================================================

            ABOUT

        ================================================== */}



        <motion.section

          id="about"

          {...sectionAnimation}

        >

          <About />

        </motion.section>





        {/* =================================================

            SKILLS

        ================================================== */}



        <motion.section

          id="skills"

          {...sectionAnimation}

        >

          <Skills />

        </motion.section>





        {/* =================================================

            PROJECTS

        ================================================== */}



        <motion.section

          id="projects"

          {...sectionAnimation}

        >

          <Projects />

        </motion.section>





        {/* =================================================

            EDUCATION

        ================================================== */}



        <motion.section

          id="education"

          {...sectionAnimation}

        >

          <Education />

        </motion.section>





        {/* =================================================

            CONTACT

        ================================================== */}



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



            {/* =================================================

                LOGO / NAME

            ================================================== */}



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





            {/* =================================================

                QUICK LINKS

            ================================================== */}



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





          {/* =================================================

              DIVIDER

          ================================================== */}



          <div className="my-8 h-px bg-white/5" />





          {/* =================================================

              BOTTOM

          ================================================== */}



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





/* =========================================================

   APP ROUTER

========================================================= */



export default function App() {

  return (

    <Routes>



      {/* =====================================================

          MAIN PORTFOLIO



          Navbar, loader, background, footer, etc.

          exist only on this route.

      ====================================================== */}



      <Route

        path="/"

        element={<HomePage />}

      />





      {/* =====================================================

          CHARACTER UNIVERSE



          Completely separate from the portfolio page.



          The Navbar and its portal transition are NOT mounted

          here.

      ====================================================== */}



      <Route

        path="/characters"

        element={<CharacterUniverse />}

      />





      {/* =====================================================

          PORTFOLIO EMAIL REPLY



          Opens the custom branded reply page.

      ====================================================== */}



      <Route

        path="/reply"

        element={<Reply />}

      />



    </Routes>

  )

}