import { API_URL } from "@config/index";
import cookie from "cookie"

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ msg: `Method ${req.method} not allowed ` });
  }
  if (!req.headers.cookie) {
    res.status(403).json({ msg: "Not Authorized" });
    return
  }

  const { token } = cookie.parse(req.headers.cookie);
  const strapiRes = await fetch(`${API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const user = await strapiRes.json();


  if (!strapiRes.ok) {
    res.status(403).json({ msg: "User Forbidden" });
    return
  }
  res.status(200).json({ user });
}


export default handler  