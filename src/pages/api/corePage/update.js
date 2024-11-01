import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;

    const values = [
      request.body.title,
      request.body.topics,
      new Date().toLocaleString() + "",
      request.body.title_image,
      request.body.video_path,
      request.body.body,
      request.body.is_manuel_page,
      request.body.description,
      request.body.meta_keys,
      request.body.is_active,
      request.body.is_show_in_menu,
      request.body.page_name,
      true,
      request.body.url,
      projectName,
    ];

    const script = `UPDATE article set
    title=$1,
    topics=$2,
    create_date=$3,
    title_image=$4,
    video_path=$5,
    body=$6,
    is_manuel_page=$7,
    description=$8,
    meta_keys=$9,
    is_active=$10,
    is_show_in_menu=$11,
    page_name=$12,
    is_core_page=$13
    where url=$14
    and project=$15;`;

    let data = await sql.query(script, values);

    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
