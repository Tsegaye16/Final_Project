import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abewatsegaye16@gmail.com",
    pass: process.env.NodeMailerPass,
  },
});

export default transporter;
