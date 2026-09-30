import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

const icons = {
  Programming: '⌘',
  Frontend: '◈',
  Backend: '⚙',
  Database: '◉',
  Tools: '✦',
  Embedded: '⚡',
  'Machine Learning': '◎',
  Other: '◇',
}

const gradients = [
  'from-pink-500 to-rose-500',
  'from-orange-400 to-red-500',
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-400',
  'from-emerald-400 to-cyan-400',
  'from-yellow-400 to-orange-500',
]

export default function Skills() {
  const skillGroups = Object.entries(skills)

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-6 py-28"
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
            What I work with
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            My{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-400" />

          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            A collection of technologies and tools I use to build,
            experiment, solve problems and bring ideas to life.
          </p>
        </motion.div>


        {/* =========================================
            SKILL CARDS
        ========================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {skillGroups.map(([group, items], index) => {

            const gradient =
              gradients[index % gradients.length]

            const icon =
              icons[group] || '◇'

            return (
              <motion.div
                key={group}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
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
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-white/20
                  hover:bg-white/[0.05]
                "
              >

                {/* Background glow */}

                <div
                  className={`
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-gradient-to-br
                    ${gradient}
                    opacity-0
                    blur-3xl
                    transition
                    duration-500
                    group-hover:opacity-20
                  `}
                />


                {/* Card Header */}

                <div className="relative flex items-center justify-between">

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      ${gradient}
                      bg-opacity-10
                      text-lg
                      font-bold
                      text-white
                      shadow-lg
                    `}
                  >
                    {icon}
                  </div>

                  <span className="text-xs font-medium text-slate-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                </div>


                {/* Category */}

                <h3 className="relative mt-6 text-lg font-semibold text-white">
                  {group}
                </h3>


                {/* Skills */}

                <div className="relative mt-5 flex flex-wrap gap-2">

                  {items.map((skill) => (

                    <motion.span
                      key={skill}
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="
                        rounded-lg
                        border
                        border-white/10
                        bg-black/20
                        px-3
                        py-1.5
                        text-sm
                        text-slate-400
                        transition
                        hover:border-pink-500/30
                        hover:text-white
                      "
                    >
                      {skill}
                    </motion.span>

                  ))}

                </div>


                {/* Bottom line */}

                <div
                  className={`
                    absolute
                    bottom-0
                    left-0
                    h-0.5
                    w-0
                    bg-gradient-to-r
                    ${gradient}
                    transition-all
                    duration-500
                    group-hover:w-full
                  `}
                />

              </motion.div>
            )
          })}

        </div>


        {/* =========================================
            TECH STACK MARQUEE
        ========================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-20 overflow-hidden"
        >

          <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-slate-600">
            Technologies I enjoy working with
          </p>


          <div className="relative overflow-hidden">

            {/* Fade edges */}

            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#080816] to-transparent" />

            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#080816] to-transparent" />


            {/* Moving row */}

            <motion.div
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex w-max gap-3"
            >

              {[
                ...skillGroups.flatMap(([, items]) => items),
                ...skillGroups.flatMap(([, items]) => items),
              ].map((skill, index) => (

                <span
                  key={`${skill}-${index}`}
                  className="
                    whitespace-nowrap
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-5
                    py-2.5
                    text-sm
                    text-slate-400
                    backdrop-blur-sm
                  "
                >
                  {skill}
                </span>

              ))}

            </motion.div>

          </div>

        </motion.div>


        {/* =========================================
            BOTTOM STATEMENT
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 text-center"
        >

          <p className="text-lg text-slate-500">
            Always learning.
            <span className="mx-2 text-pink-500">•</span>
            Always building.
            <span className="mx-2 text-orange-400">•</span>
            Always improving.
          </p>

        </motion.div>

      </div>
    </section>
  )
}