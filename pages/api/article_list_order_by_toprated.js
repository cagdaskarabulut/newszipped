import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const article_list = await sql`SELECT id, url, title, topics, create_date, like_number, title_image, body, is_manuel_page FROM public.article_newszipped order by like_number desc;`;
  return response.status(200).json({ article_list });
}