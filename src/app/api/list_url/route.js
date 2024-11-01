import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export const dynamicParams = true;
// export const revalidate = 86400;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT url FROM public.article where project=$1 and is_active=true;`;
  let article_url_list = await sql.query(script, values);
  return NextResponse.json({ article_url_list });
}
