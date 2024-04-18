import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "abc@gmail.com",
    pass: "abc",
  },
});

interface nodeMailerType {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}
export async function sendMail({
  from,
  to,
  subject,
  text,
  html,
}: nodeMailerType) {
  // send mail with defined transport object
  await transporter
    .sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    })
    .then((info) => {
      console.log("Message sent: %s", info.messageId);
    })
    .catch((err) => {
      console.log(err);
    });
}
