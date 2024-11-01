import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// export const dynamicParams = true; // true | false,
// export const revalidate = 86400;

export async function GET() {
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName];
  const script = `SELECT id, name, is_main, image, order_number FROM public.topic where project=$1 and is_main=true order by order_number, name;`;
  let list = await sql.query(script, values);
  return NextResponse.json({ list });
}
