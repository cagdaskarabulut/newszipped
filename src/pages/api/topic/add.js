import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [
      request.body.name,
      request.body.is_main,
      request.body.image,
      request.body.order_number,
      projectName,
    ];
    const script = `INSERT INTO public.topic (name, is_main, image, order_number, project) VALUES ($1,$2,$3,$4,$5);`;
    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
