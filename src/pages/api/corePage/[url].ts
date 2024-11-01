import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { url } = req?.query;
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [url?.toString(), projectName];
  const script = `SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.video_path, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name
        FROM public.article a where a.is_core_page=true and a.is_active=true and a.url=$1 and a.project=$2;`;
  let data = await sql.query(script, values);
  return res.status(200).json({ data });
}