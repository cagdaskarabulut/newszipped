import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  const projectName = process.env.PROJECT_SITE_NAME;
  try {
    const values = [projectName];
    const script = `update public.commercial set click_count=click_count+1 where project=$1;`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
