import React from "react";
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
  Tailwind,
} from "@react-email/components";

export default function ContactEmail({email,bookToken}) {
  return (
    <Html>
      <Head />
      <Preview>Payment Request Received</Preview>
      <Tailwind>
        <Body className="bg-gray-100 ">
          <Section>
            <Heading className="leading-tight">
            Payment Request Received
            </Heading>
            <Text>{bookToken}</Text>
            <Hr/>
            <Text>Your email is: {email}</Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
