import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;

    const values = [
      request.body.name,
      request.body.is_main,
      request.body.image,
      request.body.order_number,
      request.body.id,
      projectName,
    ];

    const script = `UPDATE public.topic
    SET
    name=$1,
    is_main=$2,
    image=$3,
    order_number=$4
    where id=$5 and project=$6 ;`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
