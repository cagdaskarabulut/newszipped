import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    await sql`INSERT INTO public.newszipped_article_view (url,count)
              SELECT ${request.body.url}, 0
              WHERE NOT EXISTS (
                SELECT id FROM public.newszipped_article_view 
                WHERE url=${request.body.url});`;
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
