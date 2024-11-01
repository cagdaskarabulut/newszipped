import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export const dynamicParams = true;
// export const revalidate = 86400;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT id, url, title, topics, create_date, title_image, 
is_manuel_page, description, meta_keys, is_active, 
is_show_in_menu, page_name, is_core_page, is_show_in_banner, is_banner_fit_style,is_banner_stretch_style 
FROM public.article where project=$1 and is_active=true and is_show_in_banner=true order by banner_order_number;`;
  let article_url_list = await sql.query(script, values);
  return NextResponse.json({ article_url_list });
}
