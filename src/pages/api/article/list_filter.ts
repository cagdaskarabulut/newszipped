"use server"
import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page, size, order, search, lastPageSize } = req?.query;
  let pageVal = (page?.toString() != undefined ? parseInt(page?.toString(), 10) : 1);
  let sizeVal = (size?.toString() != undefined ? parseInt(size?.toString(), 10) : 1);
  let orderVal = order?.toString();
  let orderByPart = orderVal ? `order by ${orderVal} desc,id asc` : "order by id asc";
  // let offsetVal = pageVal - 1 > 0 ? (((pageVal - 1) * sizeVal) + 1) : 0;
  let offsetVal = pageVal - 1 > 0 ? (((pageVal - 1) * sizeVal)) : 0;
  let searchVal = search?.toString();
  let searchPart = searchVal ? (`and (
    unaccent(a.topics) ilike unaccent('%${searchVal}%') or 
    unaccent(a.title) ilike unaccent('%${searchVal}%') or 
    unaccent(a.description) ilike unaccent('%${searchVal}%') or 
    unaccent(a.meta_keys) ilike unaccent('%${searchVal}%')
  )`) : "";
  let lastPageSizeVal = lastPageSize?.toString();
  let article_list;
  const projectName = process.env.PROJECT_SITE_NAME;
  let activeSize = lastPageSizeVal ? lastPageSizeVal : sizeVal;
  // console.log("lastPageSizeVal: " + lastPageSizeVal);
  // console.log("sizeVal: " + sizeVal);



  try {
    let values = [projectName, offsetVal, activeSize];

    const script = `
    SELECT a.id, a.url, a.title, a.topics, a.create_date, a.title_image, a.video_path, a.body, a.is_manuel_page, a.description, a.meta_keys, a.is_active, a.is_show_in_menu, a.page_name, a.is_core_page,is_show_in_banner, is_banner_fit_style, is_banner_stretch_style,banner_order_number,
    (CASE WHEN (select count(ak.id) from public.article_like ak where ak.project=$1 and ak.url=a.url) IS NOT NULL THEN (select count(ak.id) from public.article_like ak where ak.project=$1 and ak.url=a.url) ELSE 0 END) as like_number,
    (CASE WHEN (select distinct av.count from public.article_view av where av.project=$1 and av.url=a.url) IS NOT NULL THEN (select distinct av.count from public.article_view av where av.project=$1 and av.url=a.url) ELSE 0 END) as view_number,
    (CASE WHEN (select count(ac.id) from public.article_comment ac where ac.project=$1 and ac.url=a.url) IS NOT NULL THEN (select count(ac.id) from public.article_comment ac where ac.project=$1 and ac.url=a.url) ELSE 0 END) as comment_number
    FROM public.article a
    where a.project=$1
    and (a.is_core_page is null or a.is_core_page=false) and a.is_active=true
    ${searchPart}
    group by a.id
    ${orderByPart}
    OFFSET $2
    LIMIT $3;`;

    article_list = await sql.query(script, values);
  }
  catch (e) {
    article_list = "";
    console.log("hata: " + e);
  }
  return res.status(200).json({ article_list });
}