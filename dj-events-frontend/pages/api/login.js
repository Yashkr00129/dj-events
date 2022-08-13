import { API_URL } from "@config/index";
import cookie from "cookie"

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ msg: `Method ${req.method} not allowed ` });
    return
  }

  // Take data from the body and login with the strapi backend.
  const { identifier, password } = req.body
  const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  })
  const data = await strapiRes.json()

  // If logged in 
  if (strapiRes.ok) {
    // Set cookie
    res.setHeader("Set-Cookie", cookie.serialize("token", data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    }))
    res.status(200).json({ user: data.user })
  }
  else {  // If not logged in
    const errObject = { message: data.error.message }
    res.status(data.error.status).json(errObject)
  }
}


export default handler  