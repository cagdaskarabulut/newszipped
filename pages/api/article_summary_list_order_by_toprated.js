import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const article_summary_list_order_by_toprated = await sql`SELECT id, url, title, topic, create_date, like_number FROM public.article_summary_newszipped order by like_number desc;`;
  return response.status(200).json({ article_summary_list_order_by_toprated });
}