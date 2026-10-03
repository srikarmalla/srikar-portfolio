import crypto from 'crypto'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const REPLY_SECRET = process.env.REPLY_SECRET

export default async function handler(req, res) {
  if (!REPLY_SECRET) {
    return res.status(500).json({
      success: false,
      message: 'Reply system is not configured.',
    })
  }

  // -----------------------------
  // GET CONTACT INFORMATION
  // -----------------------------

  if (req.method === 'GET') {
    try {
      const { token } = req.query

      const contact = verifyToken(token)

      if (!contact) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired reply link.',
        })
      }

      return res.status(200).json({
        success: true,
        contact: {
          name: contact.name,
          email: contact.email,
        },
      })
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        success: false,
        message: 'Unable to load reply information.',
      })
    }
  }


  // -----------------------------
  // SEND REPLY
  // -----------------------------

  if (req.method === 'POST') {
    try {
      const { token, message } = req.body

      if (!token || !message?.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Reply message is required.',
        })
      }

      const contact = verifyToken(token)

      if (!contact) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired reply link.',
        })
      }

      const safeName = escapeHtml(contact.name)
      const safeMessage = escapeHtml(message)

      const subject = 'Re: Your message to Srikar Malla'

      const { data, error } = await resend.emails.send({
        from: 'Srikar Malla <onboarding@resend.dev>',

        to: [contact.email],

        subject,

        html: createReplyEmail({
          name: safeName,
          message: safeMessage,
        }),
      })

      if (error) {
        console.error('Resend error:', error)

        return res.status(500).json({
          success: false,
          message: 'Failed to send reply.',
        })
      }

      return res.status(200).json({
        success: true,
        message: 'Reply sent successfully.',
        id: data?.id,
      })

    } catch (error) {
      console.error('Reply server error:', error)

      return res.status(500).json({
        success: false,
        message: 'Something went wrong.',
      })
    }
  }


  return res.status(405).json({
    success: false,
    message: 'Method not allowed.',
  })
}


// =====================================
// TOKEN FUNCTIONS
// =====================================

function createSignature(payload) {
  return crypto
    .createHmac('sha256', REPLY_SECRET)
    .update(payload)
    .digest('base64url')
}

function verifyToken(token) {
  try {
    const [encodedPayload, signature] = token.split('.')

    if (!encodedPayload || !signature) {
      return null
    }

    const expectedSignature = createSignature(encodedPayload)

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      return null
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    )

    // Token expires after 7 days
    if (Date.now() > payload.exp) {
      return null
    }

    return payload

  } catch {
    return null
  }
}


// =====================================
// EMAIL TEMPLATE
// =====================================

function createReplyEmail({ name, message }) {
  return `
<!DOCTYPE html>

<html lang="en">

<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Reply from Srikar Malla</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f3f4f6;
    font-family:Arial,Helvetica,sans-serif;
    color:#111827;
  "
>

  <div
    style="
      width:100%;
      padding:40px 16px;
      box-sizing:border-box;
    "
  >

    <div
      style="
        max-width:640px;
        margin:0 auto;
        background:#ffffff;
        border-radius:20px;
        overflow:hidden;
        box-shadow:0 10px 35px rgba(0,0,0,0.08);
      "
    >

      <!-- HEADER -->

      <div
        style="
          padding:36px 32px;
          background:linear-gradient(
            135deg,
            #ec4899 0%,
            #f43f5e 50%,
            #f97316 100%
          );
          color:#ffffff;
        "
      >

        <div
          style="
            display:inline-block;
            padding:7px 12px;
            margin-bottom:16px;
            border:1px solid rgba(255,255,255,0.3);
            border-radius:999px;
            background:rgba(255,255,255,0.12);
            font-size:12px;
            font-weight:bold;
            letter-spacing:0.5px;
          "
        >
          SRIKAR MALLA
        </div>

        <h1
          style="
            margin:0;
            font-size:28px;
            line-height:1.25;
          "
        >
          Thank You For Reaching Out
        </h1>

        <p
          style="
            margin:10px 0 0;
            font-size:15px;
            line-height:1.6;
            color:rgba(255,255,255,0.9);
          "
        >
          A personal response from my portfolio.
        </p>

      </div>


      <!-- CONTENT -->

      <div style="padding:32px;">

        <p
          style="
            margin:0 0 22px;
            font-size:16px;
            line-height:1.8;
            color:#374151;
          "
        >
          Hi ${name},
        </p>


        <div
          style="
            font-size:15px;
            line-height:1.9;
            color:#374151;
            white-space:pre-wrap;
            word-break:break-word;
          "
        >
          ${message}
        </div>


        <!-- SIGNATURE -->

        <div
          style="
            margin-top:32px;
            padding-top:24px;
            border-top:1px solid #e5e7eb;
          "
        >

          <p
            style="
              margin:0;
              font-size:15px;
              font-weight:600;
              color:#111827;
            "
          >
            Best regards,
          </p>

          <p
            style="
              margin:5px 0 0;
              font-size:16px;
              font-weight:700;
              color:#db2777;
            "
          >
            Srikar Malla
          </p>

          <p
            style="
              margin:5px 0 0;
              font-size:13px;
              color:#6b7280;
            "
          >
            Computer Science & Engineering
          </p>

        </div>


        <!-- LINKS -->

        <div style="margin-top:25px;">

          <a
            href="https://github.com/srikarmalla"
            style="
              display:inline-block;
              margin-right:10px;
              padding:10px 16px;
              background:#111827;
              color:#ffffff;
              text-decoration:none;
              border-radius:8px;
              font-size:12px;
              font-weight:600;
            "
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/srikar-malla/"
            style="
              display:inline-block;
              padding:10px 16px;
              background:#ec4899;
              color:#ffffff;
              text-decoration:none;
              border-radius:8px;
              font-size:12px;
              font-weight:600;
            "
          >
            LinkedIn
          </a>

        </div>

      </div>


      <!-- FOOTER -->

      <div
        style="
          padding:22px 32px;
          border-top:1px solid #e5e7eb;
          background:#fafafa;
          text-align:center;
        "
      >

        <p
          style="
            margin:0;
            font-size:12px;
            color:#9ca3af;
          "
        >
          Sent from Srikar Malla's portfolio
        </p>

      </div>

    </div>

  </div>

</body>

</html>
`
}


// =====================================
// HTML ESCAPE
// =====================================

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}