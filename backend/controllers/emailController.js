require("dotenv").config();
const sgMail = require("@sendgrid/mail");

exports.sendEmail = async ({ body }, res) => {
  const { email, payload } = body;
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: process.env.SENDGRID_USER,
      subject: "Email",
      html: payload,
    };
    sgMail
      .send(msg);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "Message not sent" });
  }
};
