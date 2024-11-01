import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [request.body.url, request.body.user_email, projectName];
    const script = `DELETE FROM public.article_like WHERE url=$1 and user_email=$2 and project=$3;`;
    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
