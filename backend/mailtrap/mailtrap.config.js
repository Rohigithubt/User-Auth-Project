// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// export const mailtrapClient = new MailtrapClient({
// 	endpoint: process.env.MAILTRAP_ENDPOINT,
// 	token: process.env.MAILTRAP_TOKEN,
// });

// export const sender = {
// 	email: "mailtrap@demomailtrap.com",
// 	name: "Burak",
// };

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // Mailtrap SMTP host
  port: 587,                         // Can be 25, 465, 587 or 2525
  auth: {
    user: process.env.MAILTRAP_USER,     // Your Mailtrap username
    pass: process.env.MAILTRAP_PASS,     // Your Mailtrap password
  },
});

// export const sender = {
// 	email: "mailtrap@demomailtrap.com",
// 	name: "rohit",
// }