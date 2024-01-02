const nodemailer = require("nodemailer");
require("dotenv").config();

async function careerMailSend({
  full_name,
  phone_number,
  email_id,
  address,
  post,
  file,
  message,
}) {
  try {
    console.log(email_id, full_name);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.clientEmail,
        pass: process.env.clientPassword,
      },
    });

    // Email content
    const mailOptions = {
      to: "raushanSharma7462@gmail.com",
      subject: "New Career Application Received 🎉",
      html: `
        <html>
        <body>
          <p>Dear Build Wealth Realtors Team,</p>
          <p>We have received a new career application with the following details:</p>
          <ul>
            <li><strong>Name:</strong> ${full_name}</li>
            <li><strong>Phone Number:</strong> ${phone_number}</li>
            <li><strong>Email:</strong> ${email_id}</li>
            <li><strong>Address:</strong> ${address || "Not provided"}</li>
            <li><strong>Desired Post:</strong> ${post || "Not specified"}</li>
            <li><strong>Message:</strong> ${
              message || "No additional message"
            }</li>
          </ul>
          <p>Please review the application and take appropriate action.</p>
          <p>Warm regards,</p>
          <p>Build Wealth Realtors 🚀</p>
        </body>
        </html>
        `,
      attachments: file
        ? [{ filename: file.originalname, content: file.buffer }]
        : [],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.send("send mail");
  } catch (error) {
    console.log("wrong in /mail");
  }
}

module.exports = { careerMailSend };
