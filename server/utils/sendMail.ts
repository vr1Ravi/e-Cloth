import nodemailer from "nodemailer";
interface IOptions {
  email: String;
  subject: String;
  message: String;
}
export const sendEmail = async (options: IOptions) => {
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.MAIL as string,
    to: options.email as string,
    subject: options.subject as string,
    text: options.message as string,
  };
  transport.sendMail(mailOptions);
};
