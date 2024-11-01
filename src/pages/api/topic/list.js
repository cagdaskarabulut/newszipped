import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT id, name, is_main, image, order_number  FROM public.topic where project=$1 order by name;`;
  let topic_list = await sql.query(script, values);
  return response.status(200).json({ topic_list });
}
