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
      <Preview>Here is your ticket to Conclave</Preview>
      <Tailwind>
        <Body className="bg-gray-100 ">
          <Section>
            <Heading className="leading-tight">
              Here is your ticket to Conclave
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
