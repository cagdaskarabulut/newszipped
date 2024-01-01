import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const topic_list = await sql`SELECT id, name FROM public.topic_newszipped;`;
  return response.status(200).json({ topic_list });
}