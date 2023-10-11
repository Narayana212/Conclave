import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
  try {
    const jwtToken = request.cookies.get("token");

    if (jwtToken && jwtToken.value) {
      const decodedToken = jwt.verify(jwtToken.value, "secret");
      return decodedToken;
    } else {
      return { email: "", fullName: "" };
    }
  } catch (err) {
    console.error("Error decoding token:", err);
    return { email: "", fullName: "" };
  }
};
