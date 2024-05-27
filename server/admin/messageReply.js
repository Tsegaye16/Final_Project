import { promisify } from "util";
import transporter from "../user_forgote_password/node_mailer.js";
const messageReplay = async (db, req, res) => {
  try {
    const { messageId, name, reply, message, email } = req.body;
    const query = promisify(db.query).bind(db);
    const sql = "UPDATE user_message SET is_replayed = ? WHERE id = ?";
    const result = await query(sql, [1, messageId]);
    const mailOptions = {
      from: "abewatsegaye16@gmail.com",
      to: email,
      subject: "Message reply",
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #333; margin-bottom: 20px;">Dear ${name},</h1>
            <p style="font-size: 16px; color: #555;">We wanted to thank you for your feedback and respond to your message:</p>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
              <p style="font-size: 16px; color: #555;"><strong>Your feedback:</strong></p>
              <p style="font-size: 14px; color: #666;">${message}</p>
              <p style="font-size: 16px; color: #555; margin-top: 20px;"><strong>Our reply:</strong></p>
              <p style="font-size: 14px; color: #666;">${reply}</p>
            </div>
            <p style="font-size: 16px; color: #555; margin-top: 20px;">We hope this resolves your query. If you have any further questions or concerns, please don't hesitate to contact us.</p>
            <p style="font-size: 16px; color: #555; margin-top: 20px;">Good luck!</p>
            <p style="font-size: 16px; color: #555; margin-top: 10px;">Sincerely,</p>
            <p style="font-size: 16px; color: #555; margin-top: 10px;">admin of DSA</p>
          </div>
        `,
    };

    transporter.sendMail(mailOptions, (mailError) => {
      if (mailError) {
        return res
          .status(500)
          .json({ message: "Failed to send confirmation email" });
      }
      return res.status(200).json({
        message: "User already exist, Confirmation email resent.",
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Query error" });
  }
};

export default messageReplay;
