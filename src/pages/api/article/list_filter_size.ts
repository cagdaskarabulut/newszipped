"use server"
import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { order, search } = req?.query;
  let orderVal = order?.toString();
  let searchVal = search?.toString();
  let article_list_size;
  const projectName = process.env.PROJECT_SITE_NAME;

  const values = [projectName];

  let searchPart = searchVal ? (` and 
    (unaccent(LOWER(a.topics))) ilike unaccent(LOWER('%${searchVal}%')) or unaccent(LOWER(a.title)) ilike unaccent(LOWER('%${searchVal}%')) or unaccent(LOWER(a.description)) ilike unaccent(LOWER('%${searchVal}%')) or unaccent(LOWER(a.meta_keys)) ilike unaccent(LOWER('%${searchVal}%')) or
    (unaccent(UPPER(a.topics))) ilike unaccent(UPPER('%${searchVal}%')) or unaccent(UPPER(a.title)) ilike unaccent(UPPER('%${searchVal}%')) or unaccent(UPPER(a.description)) ilike unaccent(UPPER('%${searchVal}%')) or unaccent(UPPER(a.meta_keys)) ilike unaccent(UPPER('%${searchVal}%')) `) : "";

  try {
    const script = `SELECT count(a.id) FROM public.article a where a.project=$1 and (a.is_core_page is null or a.is_core_page=false) and a.is_active=true ${searchPart};`;

    // console.log("script: " + script);

    // console.log("values: " + values);

    article_list_size = await sql.query(script, values);
  } catch (e) {
    article_list_size = "";
    console.log("hata: " + e);
  }
  return res.status(200).json({ article_list_size });
}