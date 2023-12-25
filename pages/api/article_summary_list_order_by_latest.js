import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const article_summary_list_order_by_latest= await sql`SELECT id, url, title, topic, create_date, like_number FROM public.article_summary_newszipped order by create_date desc;`;
  return response.status(200).json({ article_summary_list_order_by_latest });
}