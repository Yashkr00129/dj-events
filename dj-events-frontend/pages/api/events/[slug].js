const { events } = require("./data.json");

export default function handler(req, res) {
  const slug = req.query.slug;
  const evt = events.filter((event) => event.slug === slug);
  if (req.method === "GET") {
    res.status(200).json(evt);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ method: `Method ${req.method} Not Allowed` });
  }
}
