import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export const dynamicParams = true;
// export const revalidate = 86400;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT id, project, footer_copyright, footer_company, 
    is_project_type_article, is_project_type_product, is_order_by_menu_active, is_top_menu_active, is_card_design_with_big_image, default_language, main_page_name, is_project_type_modern, is_search_bar_active     
    FROM public.article_project_special_fields where project=$1;`;
  let fields = await sql.query(script, values);
  return NextResponse.json({ fields });
}
