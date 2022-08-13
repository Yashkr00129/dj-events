import cookie from "cookie"

const handler = (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ msg: `Method ${req.method} not allowed ` });
  }
  // Destroy cookie
  res.setHeader("Set-Cookie", cookie.serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/"
  })
  );

  res.status(200).json({ message: "Success" })
}


export default handler;