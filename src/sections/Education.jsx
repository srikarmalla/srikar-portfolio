import { motion } from 'framer-motion'
import { education } from '../data/portfolio'

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* SECTION HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">
            My academic journey
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Education
          </h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-400" />

          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            My academic background and the journey that has shaped my
            technical interests and problem-solving skills.
          </p>
        </motion.div>


        {/* TIMELINE */}

        <div className="relative">

          {/* Vertical line */}

          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-pink-500/60 via-white/10 to-transparent md:block" />

          <div className="space-y-10">

            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
                className="relative md:pl-16"
              >

                {/* Timeline dot */}

                <div className="absolute left-0 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-pink-500/30 bg-[#080816] md:flex">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 shadow-lg shadow-pink-500/30" />
                </div>


                {/* Education Card */}

                <motion.div
                  whileHover={{ y: -5 }}
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
                    hover:border-pink-500/30
                    hover:bg-white/[0.05]
                    sm:p-8
                  "
                >

                  {/* Glow */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-20
                      h-48
                      w-48
                      rounded-full
                      bg-pink-500/10
                      blur-3xl
                      opacity-0
                      transition
                      duration-500
                      group-hover:opacity-100
                    "
                  />


                  <div className="relative">

                    {/* Period */}

                    <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-pink-400">
                      {item.period}
                    </div>


                    {/* Degree */}

                    <h3 className="text-xl font-semibold text-white transition group-hover:text-pink-400 sm:text-2xl">
                      {item.degree}
                    </h3>


                    {/* Institution */}

                    <p className="mt-2 text-base font-medium text-slate-300">
                      {item.school}
                    </p>


                    {/* Details */}

                    {item.detail && (
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                        {item.detail}
                      </p>
                    )}

                  </div>


                  {/* Bottom accent */}

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

              </motion.div>
            ))}

          </div>
        </div>


        {/* CURRENT STATUS */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mt-16
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-7
            text-center
            backdrop-blur-sm
          "
        >
          <p className="text-sm uppercase tracking-[0.2em] text-slate-600">
            Currently
          </p>

          <p className="mt-3 text-lg font-medium text-slate-300">
            Learning • Building • Exploring
          </p>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            Continuously developing my skills through coursework,
            projects, experiments and hands-on development.
          </p>
        </motion.div>

      </div>
    </section>
  )
}