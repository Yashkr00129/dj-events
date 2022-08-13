import { NEXT_URL } from "@config/index";

const handler = (req, res) => {
  // If the user is logged in, log them out by setting the cookie to null.
  res.setHeader("Set-Cookie", cookie.serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  }));
  res.statusCode = 200;
  res.redirect(NEXT_URL);  

 }

export default handler;