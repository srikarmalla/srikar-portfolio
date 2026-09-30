import { motion } from 'framer-motion'
import { projects } from '../data/portfolio'

const gradients = [
  'from-pink-500 to-orange-400',
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-400',
  'from-emerald-400 to-cyan-400',
  'from-yellow-400 to-orange-500',
  'from-red-500 to-pink-500',
]

export default function Projects() {
  return (
    <section
      id="projects"
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
            Things I've built
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Featured{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-400" />

          <p className="mt-6 max-w-2xl leading-8 text-slate-400">
            A selection of projects where I've experimented with different
            technologies, solved problems and turned ideas into working
            applications.
          </p>
        </motion.div>


        {/* =========================================
            PROJECT GRID
        ========================================== */}

        <div className="grid gap-6 md:grid-cols-2">

          {projects.map((project, index) => {

            const gradient =
              gradients[index % gradients.length]

            return (
              <motion.article
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 50,
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
                  duration: 0.7,
                  delay: index * 0.08,
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
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-white/20
                "
              >

                {/* =====================================
                    PROJECT VISUAL HEADER
                ====================================== */}

                <div
                  className="
                    relative
                    flex
                    h-48
                    items-center
                    justify-center
                    overflow-hidden
                    border-b
                    border-white/10
                    bg-black/20
                  "
                >

                  {/* Gradient glow */}

                  <div
                    className={`
                      absolute
                      h-40
                      w-40
                      rounded-full
                      bg-gradient-to-br
                      ${gradient}
                      opacity-10
                      blur-3xl
                      transition
                      duration-500
                      group-hover:scale-150
                      group-hover:opacity-20
                    `}
                  />


                  {/* Project number */}

                  <div className="absolute left-5 top-5">

                    <span className="text-xs font-medium tracking-widest text-slate-600">
                      PROJECT {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>


                  {/* Decorative symbol */}

                  <div
                    className={`
                      relative
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/5
                      text-3xl
                      font-bold
                      text-white
                      shadow-2xl
                      backdrop-blur-md
                      transition
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                    `}
                  >
                    {project.title?.charAt(0) || 'P'}
                  </div>


                  {/* Arrow */}

                  <div
                    className="
                      absolute
                      right-5
                      top-5
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      text-slate-500
                      transition
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-white
                    "
                  >
                    ↗
                  </div>

                </div>


                {/* =====================================
                    PROJECT CONTENT
                ====================================== */}

                <div className="flex h-full flex-col p-7">

                  {/* Title */}

                  <h3 className="text-2xl font-semibold text-white transition group-hover:text-pink-400">
                    {project.title}
                  </h3>


                  {/* Subtitle */}

                  {project.subtitle && (
                    <p className="mt-2 text-sm font-medium text-orange-400">
                      {project.subtitle}
                    </p>
                  )}


                  {/* Description */}

                  <p className="mt-5 text-sm leading-7 text-slate-400">
                    {project.description}
                  </p>


                  {/* Technology */}

                  <div className="mt-6 flex flex-wrap gap-2">

                    {project.tech.map((technology) => (

                      <span
                        key={technology}
                        className="
                          rounded-lg
                          border
                          border-white/10
                          bg-black/20
                          px-3
                          py-1.5
                          text-xs
                          text-slate-400
                          transition
                          hover:border-pink-500/30
                          hover:text-white
                        "
                      >
                        {technology}
                      </span>

                    ))}

                  </div>


                  {/* =====================================
                      BUTTONS
                  ====================================== */}

                  <div className="mt-8 flex flex-wrap gap-3">

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          rounded-xl
                          bg-gradient-to-r
                          from-pink-500
                          to-orange-400
                          px-5
                          py-2.5
                          text-sm
                          font-semibold
                          text-white
                          shadow-lg
                          shadow-pink-500/10
                          transition
                          hover:scale-105
                        "
                      >
                        Live Demo ↗
                      </a>
                    )}


                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          rounded-xl
                          border
                          border-white/10
                          bg-white/5
                          px-5
                          py-2.5
                          text-sm
                          font-medium
                          text-slate-300
                          transition
                          hover:border-white/20
                          hover:bg-white/10
                          hover:text-white
                        "
                      >
                        GitHub ↗
                      </a>
                    )}

                  </div>

                </div>


                {/* Bottom gradient */}

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

              </motion.article>
            )
          })}

        </div>


        {/* =========================================
            PROJECT CTA
        ========================================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center"
        >

          <p className="text-slate-500">
            More projects and experiments are available on my GitHub.
          </p>

          <a
            href="https://github.com/srikarmalla"
            target="_blank"
            rel="noreferrer"
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:border-pink-500/30
              hover:bg-white/10
            "
          >
            Explore GitHub
            <span>↗</span>
          </a>

        </motion.div>

      </div>
    </section>
  )
}