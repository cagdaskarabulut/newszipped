import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  const projectName = process.env.PROJECT_SITE_NAME;
  try {
    const values = [
      request.body.url,
      0,
      projectName,
      projectName,
      request.body.url,
      projectName,
    ];
    const script = `INSERT INTO public.article_view (url,count,project)
    SELECT $1, $2, $3
    WHERE NOT EXISTS (
      SELECT id FROM public.article_view 
      WHERE project=$4 and url=$5 and project=$6 );`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
