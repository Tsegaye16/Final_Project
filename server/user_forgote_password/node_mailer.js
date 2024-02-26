import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abewatsegaye16@gmail.com',
      pass: 'hrry hqzh ycck xkhb',
    },
  });

  export default transporter