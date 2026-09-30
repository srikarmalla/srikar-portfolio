import { useState } from 'react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@srikarmalla',
    href: 'https://github.com/srikarmalla',
    icon: '⌘',
  },
  {
    name: 'LinkedIn',
    handle: 'Connect with me',
    href: 'https://www.linkedin.com/in/srikar-malla/',
    icon: 'in',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    setSent(false)
    setError('')
  }

  const submit = async (e) => {
    e.preventDefault()

    setSending(true)
    setSent(false)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to send message.'
        )
      }

      setSent(true)

      setForm({
        name: '',
        email: '',
        message: '',
      })

    } catch (error) {
      console.error(error)

      setError(
        'Unable to send your message right now. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  const inputClass = `
    w-full
    rounded-xl
    border
    border-white/10
    bg-white/[0.03]
    px-4
    py-3.5
    text-sm
    text-white
    outline-none
    backdrop-blur-sm
    placeholder:text-slate-600
    transition-all
    duration-300
    focus:border-pink-500/50
    focus:bg-white/[0.05]
    focus:ring-2
    focus:ring-pink-500/10
  `

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">
            Let's connect
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get in{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-400" />

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Have a project idea, internship opportunity, collaboration
            or just want to say hello? Feel free to reach out.
          </p>
        </motion.div>


        {/* CONTACT GRID */}

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-5"
          >

            {/* Availability */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-7
                backdrop-blur-sm
              "
            >
              <div className="flex items-center gap-3">

                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
                </span>

                <span className="text-sm font-medium text-slate-300">
                  Open to opportunities
                </span>

              </div>

              <p className="mt-5 text-2xl font-semibold text-white">
                Let's build something
                <span className="text-pink-400"> great.</span>
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                I'm interested in internships, software projects,
                collaborations and opportunities to learn and contribute.
              </p>
            </div>


            {/* Social links */}

            <div className="grid gap-4">

              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    backdrop-blur-sm
                    transition
                    duration-300
                    hover:border-white/20
                    hover:bg-white/[0.05]
                  "
                >

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      text-sm
                      font-bold
                      text-slate-300
                      transition
                      group-hover:scale-105
                      group-hover:text-white
                    "
                  >
                    {social.icon}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      {social.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      {social.handle}
                    </p>
                  </div>

                  <span className="ml-auto text-slate-600 transition group-hover:translate-x-1 group-hover:text-white">
                    ↗
                  </span>

                </a>
              ))}

            </div>

          </motion.div>


          {/* CONTACT FORM */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-7
              backdrop-blur-sm
              sm:p-8
            "
          >

            <div className="mb-8">

              <h3 className="text-2xl font-semibold text-white">
                Send me a message
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Send me a message directly through this form. I'll receive
                it in my inbox and get back to you as soon as possible.
              </p>

            </div>


            <form
              onSubmit={submit}
              className="space-y-5"
            >

              {/* NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  className={inputClass}
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  required
                  onChange={update}
                />

              </div>


              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Your Email
                </label>

                <input
                  id="email"
                  className={inputClass}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  required
                  onChange={update}
                />

              </div>


              {/* MESSAGE */}

              <div>

                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  className={`${inputClass} resize-none`}
                  name="message"
                  rows="6"
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  required
                  onChange={update}
                />

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                disabled={sending}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-pink-500
                  to-orange-400
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-pink-500/10
                  transition
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-pink-500/20
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {sending ? 'Sending...' : 'Send Message'}

                {!sending && (
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                )}

              </button>

            </form>


            {/* SUCCESS */}

            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-sm text-green-400"
              >
                ✓ Message sent successfully. Thank you for reaching out!
              </motion.p>
            )}


            {/* ERROR */}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}

          </motion.div>

        </div>


        {/* FINAL CTA */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            relative
            mt-20
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-gradient-to-r
            from-pink-500/[0.08]
            via-white/[0.03]
            to-orange-400/[0.08]
            p-8
            text-center
            sm:p-12
          "
        >

          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-72 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />

          <div className="relative">

            <p className="text-sm uppercase tracking-[0.2em] text-slate-600">
              Have an idea?
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Let's turn it into something real.
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Whether it's a project, collaboration or opportunity,
              I'd be happy to hear from you.
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  )
}