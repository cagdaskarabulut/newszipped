import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { url } = req?.query;
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName, url?.toString()];
  const script = `SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.video_path, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name, a.is_core_page, is_show_in_banner, is_banner_fit_style, is_banner_stretch_style, banner_order_number,
      (select count(ak.id) from public.article_like ak where ak.project=$1 and ak.url=a.url) as like_number,
      (select distinct av.count from public.article_view av where av.project=$1 and av.url=a.url) as view_number,
      (select count(ac.id) from public.article_comment ac where ac.project=$1 and ac.url=a.url) as comment_number
       FROM public.article a where a.project=$1 and a.is_active=true and a.url=$2;`;
  let article_list = await sql.query(script, values);
  return res.status(200).json({ article_list });
}