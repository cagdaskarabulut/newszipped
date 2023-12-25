import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    let url = request.body.url;
    const article_summary_findby_url = await sql`SELECT id, url, title, topic, create_date, like_number FROM public.article_summary_newszipped where url=${url};`;
    return response.status(200).json({ article_summary_findby_url });
  } catch (error) {
    return response.status(500).json({ error });
  }
}