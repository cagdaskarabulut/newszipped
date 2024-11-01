import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [
      request.body.url,
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
      projectName,
    ];

    const script = `INSERT INTO article (url, title, topics, create_date, title_image, video_path, body, is_manuel_page, description, meta_keys, is_active, is_show_in_menu, page_name, is_core_page, project) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
