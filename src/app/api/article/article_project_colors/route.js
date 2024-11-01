import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export const dynamicParams = true;
// export const revalidate = 1;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  let values = [projectName];
  const script = `SELECT id, project, fontcolor, headerfontcolor, backgroundcolor, headerbackgroundcolor1, headerbackgroundcolor2, bodycontentbackgroundcolor1, bodycontentbackgroundcolor2, footerbackgroundcolor1, footerbackgroundcolor2, searchbarcolor, mainmenuselectedfontcolor, categorymenuselectedbackgroundcolor, categorymenuselectedfontcolor, orderbymenuselectedfontcolor, tagcolor, commentbuttonfontcolor, commentbuttonbackgroundcolor, commentbuttonbordercolor, loginbuttonfontcolor, loginbuttonbackgroundcolor, loginbuttonbordercolor, errorcolor, cautioncolor
	FROM public.article_project_colors where project=$1;`;
  let fields = await sql.query(script, values);
  return NextResponse.json({ fields });
}
