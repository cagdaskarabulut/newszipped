import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`INSERT INTO article_summary_newszipped (url, title, topic, create_date, like_number) VALUES (${request.body.url}, ${request.body.title}, ${request.body.topic}, ${new Date().toLocaleString() + ''}, ${request.body.like_number});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
