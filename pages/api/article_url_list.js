import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const article_url_list = await sql`SELECT url FROM public.article_newszipped;`;
  return response.status(200).json({ article_url_list });
}