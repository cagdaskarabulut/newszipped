import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const article_summary_newszipped = await sql`SELECT url FROM public.article_summary_newszipped;`;
  return response.status(200).json({ article_summary_newszipped });
}