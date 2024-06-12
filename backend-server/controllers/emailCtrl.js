const dotenv = require("dotenv");
dotenv.config();
const path = require("path");


const nodemailer = require("nodemailer");
// const path = require("path");

const sendEmail = async (data) => {

  console.log("myData: ", data);

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.ethereal.email",
      host: "smtp.gmail.com",
      // port: 587,
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      // auth: {
      //   user: `patsy39@ethereal.email`,
      //   pass: `d1BfxsxETXt1UmGh1X`,
      // },
      auth: {
        user: `${process.env.MAIL_ID}`,
        pass: `${process.env.MP}`,
      },
      // tls: {
      //   rejectUnauthorized: false
      // },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      // from: '"Hey 👻" <abc@gmail.com>', // sender address
      from: {
        name: "Digitic",
        address: process.env.MAIL_ID
      },

      to: data?.to, // list of receivers , for multiple send use array of string of email id
      subject: data?.subject, // Subject line
      text: data?.text, // plain text body
      html: data?.html, // html body
      attachments: [
        {
          filename: "invoice.pdf",
          path: path.join(__dirname, "../public/files/invoice.pdf"),
          contentType: "application/pdf"
        },
        {
          filename: "ecommerce.jpg",
          path: path.join(__dirname, "../public/files/ecommerce.jpg"),
          contentType: "image/jpg"
        }
      ]
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

  } catch (error) {
    console.error("error sending email", error);
  }
};

module.exports = sendEmail;
