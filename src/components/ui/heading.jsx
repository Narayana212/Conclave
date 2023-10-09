import React from "react";
import { twMerge } from "tailwind-merge";

export default function Heading({ text, styles }) {
  return (
    <h1
      style={{
        background: "linear-gradient(161deg, #AC016A -11.7%, #FBA150 101.48%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      className={twMerge(styles, "font-bold opacity-80")}
    >
      {text}
    </h1>
  );
}
