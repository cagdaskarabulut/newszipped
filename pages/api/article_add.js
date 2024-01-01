import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`INSERT INTO article_newszipped (url, title, topics, create_date, like_number, title_image, body, is_manuel_page) VALUES (${request.body.url}, ${request.body.title}, ${request.body.topic}, ${new Date().toLocaleString() + ''}, ${request.body.like_number}, ${request.body.title_image}, ${request.body.body}, ${request.body.is_manuel_page});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
