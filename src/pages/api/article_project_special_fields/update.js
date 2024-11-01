import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    //todo - is_project_type_modern alanı eklenecek.
    const projectName = process.env.PROJECT_SITE_NAME;
    const values = [
      request.body.is_project_type_article,
      request.body.is_project_type_product,
      request.body.is_order_by_menu_active,
      request.body.is_top_menu_active,
      request.body.is_card_design_with_big_image,
      request.body.default_language,
      request.body.main_page_name,
      projectName,
    ];
    const script = `UPDATE article_project_special_fields set  
      is_project_type_article=$1,
      is_project_type_product=$2,
      is_order_by_menu_active=$3,
      is_top_menu_active=$4,
      is_card_design_with_big_image=$5,
      default_language=$6,
      main_page_name=$7
      where project=$8;`;
    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
