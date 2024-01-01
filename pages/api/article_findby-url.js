import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    let url = request.body.url;
    const article = await sql`SELECT id, url, title, topics, create_date, like_number, title_image, body, is_manuel_page FROM public.article_newszipped where url=${url};`;
    return response.status(200).json({ article });
  } catch (error) {
    return response.status(500).json({ error });
  }
}