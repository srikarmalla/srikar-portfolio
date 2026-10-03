import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

const REPLY_SECRET = process.env.REPLY_SECRET

function createReplyToken(name, email) {
  const payload = {
    name,
    email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }

  const encodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url')

  const signature = crypto
    .createHmac('sha256', REPLY_SECRET)
    .update(encodedPayload)
    .digest('base64url')

  return `${encodedPayload}.${signature}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields.',
      })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    /*
      Create secure reply token
    */
    const replyToken = createReplyToken(name, email)

    /*
      Get website URL

      Example:
      https://srikar-portfolio-three.vercel.app
    */
    const siteUrl = (
      process.env.SITE_URL ||
      `https://${req.headers.host}`
    ).replace(/\/+$/, '')

    /*
      IMPORTANT:
      The old version incorrectly used:

      ${siteUrl}/?reply=...

      That opens the home page.

      We need:

      ${siteUrl}/reply?reply=...
    */
    const replyUrl =
      `${siteUrl}/reply?reply=${encodeURIComponent(replyToken)}`

    const replySubject = `Re: Your message to Srikar Malla`

    const { data, error } = await resend.emails.send({
      from: 'Srikar Malla Portfolio <onboarding@resend.dev>',

      /*
        This allows normal Gmail "Reply" to go
        directly to the visitor.
      */
      replyTo: email,

      to: [process.env.CONTACT_EMAIL],

      subject: `New portfolio inquiry from ${name}`,

      html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>New Portfolio Inquiry</title>
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

    <!-- Main Card -->

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

      <!-- Header -->

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
          PORTFOLIO CONTACT
        </div>

        <h1
          style="
            margin:0;
            font-size:28px;
            line-height:1.25;
            font-weight:700;
          "
        >
          New Portfolio Inquiry
        </h1>

        <p
          style="
            margin:10px 0 0;
            font-size:15px;
            line-height:1.6;
            color:rgba(255,255,255,0.9);
          "
        >
          Someone reached out to you through your portfolio website.
        </p>

      </div>


      <!-- Content -->

      <div style="padding:32px;">

        <p
          style="
            margin:0 0 24px;
            font-size:15px;
            line-height:1.7;
            color:#4b5563;
          "
        >
          You have received a new message from a visitor.
          Here are their contact details:
        </p>


        <!-- Contact Details -->

        <div
          style="
            padding:22px;
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:14px;
          "
        >

          <div style="margin-bottom:16px;">

            <div
              style="
                margin-bottom:5px;
                font-size:12px;
                font-weight:bold;
                text-transform:uppercase;
                letter-spacing:0.7px;
                color:#9ca3af;
              "
            >
              Name
            </div>

            <div
              style="
                font-size:16px;
                font-weight:600;
                color:#111827;
              "
            >
              ${safeName}
            </div>

          </div>


          <div>

            <div
              style="
                margin-bottom:5px;
                font-size:12px;
                font-weight:bold;
                text-transform:uppercase;
                letter-spacing:0.7px;
                color:#9ca3af;
              "
            >
              Email
            </div>

            <a
              href="mailto:${encodeURIComponent(email)}"
              style="
                font-size:16px;
                color:#db2777;
                text-decoration:none;
                word-break:break-word;
              "
            >
              ${safeEmail}
            </a>

          </div>

        </div>


        <!-- Message -->

        <div style="margin-top:30px;">

          <h2
            style="
              margin:0 0 12px;
              font-size:18px;
              color:#111827;
            "
          >
            Message
          </h2>

          <div
            style="
              padding:22px;
              background:#f9fafb;
              border-left:4px solid #ec4899;
              border-radius:0 12px 12px 0;
              color:#374151;
              font-size:15px;
              line-height:1.8;
              white-space:pre-wrap;
              word-break:break-word;
            "
          >
            ${safeMessage}
          </div>

        </div>


        <!-- Custom Reply Button -->

        <div
          style="
            margin-top:32px;
            text-align:center;
          "
        >

          <a
            href="${replyUrl}"
            style="
              display:inline-block;
              padding:14px 26px;
              background:#111827;
              color:#ffffff;
              text-decoration:none;
              border-radius:10px;
              font-size:14px;
              font-weight:600;
            "
          >
            Reply to ${safeName}
          </a>

        </div>


        <!-- Reply-To Notice -->

        <div
          style="
            margin-top:24px;
            padding:14px 16px;
            background:#fff7ed;
            border:1px solid #fed7aa;
            border-radius:10px;
            color:#9a3412;
            font-size:12px;
            line-height:1.6;
          "
        >

          <strong>Reply-To:</strong>
          ${safeEmail}

          <br />

          Clicking the custom Reply button will open your
          portfolio reply page.

        </div>

      </div>


      <!-- Footer -->

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
            font-size:13px;
            font-weight:600;
            color:#374151;
          "
        >
          Srikar Malla
        </p>

        <p
          style="
            margin:5px 0 0;
            font-size:12px;
            color:#9ca3af;
          "
        >
          Computer Science & Engineering • Portfolio
        </p>

        <p
          style="
            margin:12px 0 0;
            font-size:11px;
            color:#9ca3af;
          "
        >
          This email was automatically generated by your portfolio
          contact form.
        </p>

      </div>

    </div>

  </div>

</body>

</html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)

      return res.status(500).json({
        success: false,
        message: 'Failed to send email.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      id: data?.id,
    })

  } catch (error) {
    console.error('Server error:', error)

    return res.status(500).json({
      success: false,
      message: 'Something went wrong.',
    })
  }
}


function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}