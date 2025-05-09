import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pamoladize10@gmail.com',
        pass: process.env.APP_PASSWORD_KEY
    }
})


export const sendMailToNewUser = async (senderEmail, receiverEmail) => {
  const info = await transporter.sendMail({
    from: `"ChatStream Invite" <no-reply@chatstream.com>`, // consistent app identity
    to: receiverEmail,
    subject: `🎉 You’ve been invited to ChatStream by ${senderEmail}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">
        <h2 style="color: #4F46E5;">👋 You're Invited!</h2>
        <p style="font-size: 16px; color: #333;">
          <strong>${senderEmail}</strong> has invited you to join <strong>ChatStream</strong> — a fast and fun way to chat in real time.
        </p>

        <p style="font-size: 16px; color: #333;">
          To connect with <strong>${senderEmail}</strong> and get started with your new ChatStream account, please sign up using the email <strong>${receiverEmail}</strong>. Once you sign up, your friend will be able to find you quickly and start chatting instantly!
        </p>

        <p style="font-size: 16px; color: #333;">
          Click the button below to sign up and start chatting:
        </p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="https://chatstream-07t0.onrender.com/signup" 
             style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            🚀 Join ChatStream Now
          </a>
        </div>

        <p style="font-size: 14px; color: #888;">Didn’t expect this invite? You can safely ignore this email.</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin-top: 32px;" />
        <p style="font-size: 12px; color: #aaa; text-align: center;">
          Sent by ChatStream • Real-time conversations made simple
        </p>
      </div>
    `
  });

  console.log("📩 Email sent:", info.messageId);
  console.log("📨 Preview URL:", nodemailer.getTestMessageUrl(info)); // for Ethereal
};
