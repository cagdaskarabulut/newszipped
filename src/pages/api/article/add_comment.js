import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  const projectName = process.env.PROJECT_SITE_NAME;
  try {
    const values = [
      request.body.url,
      request.body.user_email,
      request.body.user_name,
      request.body.comment,
      projectName,
    ];

    const script = `INSERT INTO public.article_comment (url, user_email, user_name,create_date, comment,project)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, $5);`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
