import { motion } from 'framer-motion'

const highlights = [
  {
    number: '01',
    title: 'Web Development',
    description:
      'Building responsive and interactive web applications using React, JavaScript, Node.js and modern web technologies.',
  },
  {
    number: '02',
    title: 'Problem Solving',
    description:
      'Enjoy solving programming and algorithmic problems while continuously improving my data structures and problem-solving skills.',
  },
  {
    number: '03',
    title: 'Embedded Systems',
    description:
      'Exploring microcontrollers and hardware projects using STM32, sensors, LCD displays and communication modules.',
  },
]

const stats = [
  {
    value: '10+',
    label: 'Technologies',
  },
  {
    value: '5+',
    label: 'Projects',
  },
  {
    value: 'CSE',
    label: 'B.Tech',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* =========================================
            SECTION HEADER
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">
            Get to know me
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            About{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-400" />

        </motion.div>


        {/* =========================================
            MAIN ABOUT CONTENT
        ========================================== */}

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">


          {/* =====================================
              LEFT — INTRODUCTION
          ====================================== */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">

              <p className="text-lg leading-8 text-slate-300">
                I'm a{' '}
                <span className="font-semibold text-white">
                  B.Tech Computer Science Engineering student
                </span>{' '}
                passionate about building useful technology and turning
                ideas into working products.
              </p>

              <p className="mt-6 leading-8 text-slate-400">
                My interests span across{' '}
                <span className="text-slate-200">
                  web development, software engineering, algorithms,
                  machine learning and embedded systems.
                </span>{' '}
                I enjoy understanding how things work and then using that
                knowledge to build something practical.
              </p>

              <p className="mt-6 leading-8 text-slate-400">
                From developing React interfaces and Node.js backends to
                experimenting with STM32 microcontrollers and sensors,
                I like working across different layers of technology.
              </p>

              <p className="mt-6 leading-8 text-slate-400">
                I'm continuously learning, building projects and looking
                for opportunities where I can apply my skills to real-world
                problems.
              </p>

            </div>

          </motion.div>


          {/* =====================================
              RIGHT — STATS
          ====================================== */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5"
          >

            {stats.map((stat, index) => (

              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  backdrop-blur-sm
                  transition
                  hover:border-pink-500/20
                  hover:bg-white/[0.05]
                "
              >

                <p
                  className="
                    text-4xl
                    font-bold
                    bg-gradient-to-r
                    from-pink-500
                    to-orange-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  {stat.value}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {stat.label}
                </p>

              </motion.div>

            ))}

          </motion.div>

        </div>


        {/* =========================================
            WHAT I DO
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >

          <div className="mb-8">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              What I do
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Things I enjoy building
            </h3>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {highlights.map((item, index) => (

              <motion.div
                key={item.number}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-7
                  transition-all
                  duration-300
                  hover:border-pink-500/30
                  hover:bg-white/[0.05]
                "
              >

                {/* Number */}

                <div className="flex items-center justify-between">

                  <span
                    className="
                      text-sm
                      font-bold
                      text-pink-400
                    "
                  >
                    {item.number}
                  </span>

                  <span
                    className="
                      text-xl
                      text-slate-700
                      transition
                      group-hover:text-pink-400
                    "
                  >
                    ↗
                  </span>

                </div>


                {/* Title */}

                <h4 className="mt-8 text-xl font-semibold text-white">
                  {item.title}
                </h4>


                {/* Description */}

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>


                {/* Bottom line */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-0.5
                    w-0
                    bg-gradient-to-r
                    from-pink-500
                    to-orange-400
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

              </motion.div>

            ))}

          </div>

        </motion.div>


        {/* =========================================
            PERSONAL TAGS
        ========================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex flex-wrap gap-3"
        >

          {[
            'React',
            'JavaScript',
            'Python',
            'Java',
            'Node.js',
            'MySQL',
            'STM32',
            'Machine Learning',
          ].map((technology) => (

            <span
              key={technology}
              className="
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-4
                py-2
                text-sm
                text-slate-400
                transition
                hover:border-pink-500/30
                hover:text-white
              "
            >
              {technology}
            </span>

          ))}

        </motion.div>

      </div>
    </section>
  )
}