import {
  Body,
  Heading,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind
} from "@react-email/components";

import * as React from "react";

export const ContactEmail = ({ message, senderEmail }) => {
  return (
    <Html>
      <Head />
      <Preview>New Message from Conclave Contact Form</Preview>
      <Tailwind>
        <Body className="bg-gray-100 ">
         <Container>
          <Section className="bg-white border-black my-10 px-10 py-4 rounded-md ">
            <Heading className="leading-tight">
              You recevied the follwing message from the contact form
            </Heading>
            <Text>{message}</Text>
            <Hr/>
            <Text>The sender's email is: {senderEmail}</Text>
          </Section>
         </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
