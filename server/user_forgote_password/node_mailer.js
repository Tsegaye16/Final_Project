import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abewatsegaye16@gmail.com',
      pass: 'Abewa_Chanie29',
    },
  });

  export default transporter