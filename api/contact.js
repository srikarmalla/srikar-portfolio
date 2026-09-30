import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    })
  }

  try {
    const { name, email, message } = req.body

    // Validate form
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields.',
      })
    }

    // Send email to Srikar
    const { data, error } = await resend.emails.send({
      from: 'Srikar Malla Portfolio <onboarding@resend.dev>',

      to: [process.env.CONTACT_EMAIL],

      // When you press Reply in Gmail,
      // it will reply to the visitor.
      replyTo: email,

      subject: `New Portfolio Message from ${name}`,

      html: `
        <!DOCTYPE html>

        <html>
          <body
            style="
              margin: 0;
              padding: 0;
              background: #f4f4f7;
              font-family: Arial, Helvetica, sans-serif;
            "
          >

            <div
              style="
                max-width: 620px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 8px 30px rgba(0,0,0,0.08);
              "
            >

              <!-- HEADER -->

              <div
                style="
                  padding: 30px;
                  background: linear-gradient(
                    135deg,
                    #ec4899,
                    #f97316
                  );
                  color: white;
                "
              >

                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                  "
                >
                  New Portfolio Message
                </h1>

                <p
                  style="
                    margin: 8px 0 0;
                    opacity: 0.9;
                    font-size: 14px;
                  "
                >
                  Someone contacted you through your portfolio.
                </p>

              </div>


              <!-- CONTENT -->

              <div style="padding: 32px;">

                <p
                  style="
                    margin-top: 0;
                    color: #555;
                    font-size: 14px;
                  "
                >
                  You received a new message from your portfolio website.
                </p>


                <!-- CONTACT DETAILS -->

                <div
                  style="
                    margin-top: 24px;
                    padding: 20px;
                    background: #f8f8fa;
                    border-radius: 12px;
                  "
                >

                  <p style="margin: 0 0 12px;">
                    <strong>Name:</strong>
                    ${escapeHtml(name)}
                  </p>

                  <p style="margin: 0;">
                    <strong>Email:</strong>
                    ${escapeHtml(email)}
                  </p>

                </div>


                <!-- MESSAGE -->

                <h3
                  style="
                    margin-top: 28px;
                    color: #222;
                  "
                >
                  Message
                </h3>

                <div
                  style="
                    padding: 20px;
                    border-left: 4px solid #ec4899;
                    background: #fafafa;
                    color: #444;
                    line-height: 1.7;
                    white-space: pre-wrap;
                  "
                >
                  ${escapeHtml(message)}
                </div>


                <!-- REPLY BUTTON -->

                <div
                  style="
                    margin-top: 28px;
                    text-align: center;
                  "
                >

                  <a
                    href="mailto:${escapeHtml(email)}"
                    style="
                      display: inline-block;
                      padding: 12px 22px;
                      background: #111827;
                      color: white;
                      text-decoration: none;
                      border-radius: 8px;
                      font-size: 14px;
                    "
                  >
                    Reply to ${escapeHtml(name)}
                  </a>

                </div>

              </div>


              <!-- FOOTER -->

              <div
                style="
                  padding: 22px 32px;
                  border-top: 1px solid #eeeeee;
                  color: #888;
                  font-size: 12px;
                  text-align: center;
                "
              >
                Sent from Srikar Malla's Portfolio
              </div>

            </div>

          </body>
        </html>
      `,
    })

    // Resend returned an error
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


/*
  Escape HTML characters so a visitor
  cannot inject HTML into your email.
*/

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}