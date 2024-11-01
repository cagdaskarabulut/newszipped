import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [
      request.body.url,
      request.body.user_email,
      projectName,
      projectName,
      request.body.url,
      request.body.user_email,
    ];
    const script = `INSERT INTO public.article_like (url, user_email, create_date,project)
          SELECT $1, $2, CURRENT_TIMESTAMP, $3
          WHERE NOT EXISTS (
            SELECT id FROM public.article_like 
            WHERE project=$4 and url=$5 and user_email=$6 );`;
    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
