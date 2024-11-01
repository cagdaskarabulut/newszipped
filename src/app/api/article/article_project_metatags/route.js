import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const dynamicParams = true;
// export const revalidate = 86400;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT id, project, title, name, description, keywords, creator, publisher, images, icon
    FROM public.article_project_metatags where project=$1;`;
  let metatags = await sql.query(script, values);
  return NextResponse.json({ metatags });
}
