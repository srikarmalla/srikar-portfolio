import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Reply() {
  const [token, setToken] = useState('')
  const [contact, setContact] = useState(null)

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const replyToken = params.get('reply')

    if (!replyToken) {
      setError('Invalid reply link.')
      setLoading(false)
      return
    }

    setToken(replyToken)

    fetch(`/api/reply?token=${encodeURIComponent(replyToken)}`)
      .then(async (response) => {
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Invalid reply link.')
        }

        setContact(data.contact)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const sendReply = async (e) => {
    e.preventDefault()

    if (!message.trim()) {
      setError('Please enter a reply.')
      return
    }

    setSending(true)
    setError('')
    setSent(false)

    try {
      const response = await fetch('/api/reply', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          token,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reply.')
      }

      setSent(true)
      setMessage('')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Unable to send reply.')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-pink-500" />

          <p className="text-sm text-slate-400">
            Loading reply...
          </p>
        </div>
      </main>
    )
  }

  if (error && !contact) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6">
        <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-white/[0.03] p-8 text-center backdrop-blur-xl">
          <div className="mb-4 text-4xl">⚠️</div>

          <h1 className="text-2xl font-bold text-white">
            Invalid Reply Link
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            This reply link may have expired or is no longer valid.
          </p>

          <p className="mt-5 text-sm text-red-400">
            {error}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-12 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">
            Portfolio Mail
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Reply to{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              {contact?.name}
            </span>
          </h1>

          <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-400" />

          <p className="mt-5 text-sm leading-7 text-slate-400">
            Write your response below and send it directly to the visitor.
          </p>
        </motion.div>


        {/* REPLY CARD */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            shadow-2xl
            backdrop-blur-xl
          "
        >

          {/* CONTACT INFO */}

          <div
            className="
              border-b
              border-white/10
              bg-gradient-to-r
              from-pink-500/[0.08]
              via-white/[0.02]
              to-orange-400/[0.08]
              p-6
              sm:p-7
            "
          >

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Recipient
                </p>

                <p className="mt-2 text-lg font-semibold text-white">
                  {contact?.name}
                </p>

                <p className="mt-1 break-all text-sm text-slate-400">
                  {contact?.email}
                </p>
              </div>

              <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-medium text-green-400">
                Ready to reply
              </div>

            </div>

          </div>


          {/* FORM */}

          <form
            onSubmit={sendReply}
            className="p-6 sm:p-8"
          >

            <label
              htmlFor="reply"
              className="mb-3 block text-sm font-medium text-slate-300"
            >
              Your Reply
            </label>

            <textarea
              id="reply"
              rows="12"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                setError('')
                setSent(false)
              }}
              placeholder={`Hi ${contact?.name},

Thank you for reaching out through my portfolio.

I'd be happy to discuss this with you.

Looking forward to hearing from you.

Best regards,
Srikar Malla`}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-white/10
                bg-black/20
                px-5
                py-4
                text-sm
                leading-7
                text-white
                outline-none
                placeholder:text-slate-700
                transition
                duration-300
                focus:border-pink-500/50
                focus:ring-2
                focus:ring-pink-500/10
              "
              required
            />

            {error && (
              <p className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  mt-4
                  rounded-xl
                  border
                  border-green-500/20
                  bg-green-500/10
                  px-4
                  py-3
                  text-sm
                  text-green-400
                "
              >
                ✓ Reply sent successfully to {contact?.name}.
              </motion.div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="
                group
                mt-6
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
                py-4
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-pink-500/10
                transition
                duration-300
                hover:scale-[1.01]
                hover:shadow-pink-500/20
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {sending ? 'Sending Reply...' : 'Send Reply'}

              {!sending && (
                <span className="transition group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>

          </form>

        </motion.div>


        {/* FOOTER */}

        <p className="mt-8 text-center text-xs text-slate-700">
          Srikar Malla • Computer Science & Engineering
        </p>

      </div>
    </main>
  )
}