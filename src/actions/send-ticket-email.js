"use server";
import {ContactEmail} from '../email/contact-email'
import Plunk from "@plunk/node";
import { render } from "@react-email/components";
import TicketEmail from "../email/ticket-email";

const plunk = new Plunk(process.env.PLUNK_API_KEY);
export const sendTicketEmail = async ({bookToken,userData}) => {

  const ticketHtml = render(
    <TicketEmail
      email={userData.email}
      bookToken={`Hi ${userData.fullName} Payment Request is confirmed here is booking ${bookToken}..`}
    />
  );

  const response = await plunk.emails.send({
    to: userData.email,
    subject: "Payment confirmed",
    body: ticketHtml,
  });

  console.log(response)
};
