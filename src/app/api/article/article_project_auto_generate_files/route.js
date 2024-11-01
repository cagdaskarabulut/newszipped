import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export const dynamicParams = true;
// export const revalidate = 86400;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT id, file_name, file_content, file_path, project FROM public.article_project_auto_generate_files where project=$1`;
  let file = await sql.query(script, values);

  return NextResponse.json({ file });
}
