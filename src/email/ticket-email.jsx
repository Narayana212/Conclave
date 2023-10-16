import React from "react";
import {
  Body,
  Heading,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

export function TicketEmail() {
  return (
    <Html>
    <Head />
    <Preview>
      {" "}
      We have received your ticket request! | Business Conclave 2023
    </Preview>

    <Body className="bg-gray-100  ">
      <Section className="bg-white flex items-center justify-center flex-col px-5 py-5">
        <Heading className="leading-tight">
          We have received your ticket request! | Business Conclave 2023
        </Heading>
        <Hr />
        <Text>
          Greetings trailblazer,
          <Hr style={{ width: "0px" }} />
          Congratulations on taking your first step towards networking,
          learning, and setting the stage for success!
          <Hr style={{ width: "0px" }} />
          We have received your registration for the tickets to our esteemed
          event, the Business Conclave 2023, which is being hosted on 28th
          October. Thank you for expressing interest in our event. Please
          allow us 1-3 business days to verify your payment and confirm your
          participation in the event. We request your kind patience for the
          same.
          <Hr style={{ width: "0px" }} />
          In the meantime, check out our speaker reveals and other perks of
          the conclave on our Instagram page-{" "}
          <Link href="https://instagram.com/snioebusinessconclave?igshid=NTc4MTIwNjQ2YQ">
            @snioebusinessconclave
          </Link>{" "}
          and prepare for a grand celebration of #10YearsOfInspiria. We look
          forward to hosting you very soon.
        </Text>
        <Text style={{ fontSize: "10px" }}>
          NOTE- If you do not receive your digital tickets within 72 hours of
          receiving this email, please feel free to contact our Head Of
          Directors, Adi Satya Arora, through WhatsApp at +91 93152 33567.
        </Text>
        <Text>Warm Regards Team Inspiria</Text>
      </Section>
    </Body>
  </Html>
  );
}
