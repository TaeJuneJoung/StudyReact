import { insertRowData } from "@/lib/mongo-db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const result = insertRowData(data);
    console.log(result);

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
