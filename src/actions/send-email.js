"use server"
import { Resend } from "resend";
import { ContactEmail } from '../email/contact-email';
c
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (data) => {
  console.log("server running", <ContactEmail />);
  const { emailId, message } = data;
  const senderEmail = emailId;
  const response = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: "raavinarayana212@gmail.com",
    subject: "Message from form",
    reply_to: senderEmail,
    react: <ContactEmail message={message} senderEmail={senderEmail} />,
  });
  console.log(response);
};