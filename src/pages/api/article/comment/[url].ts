"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName, url?.toString()];
  const script = `SELECT id, url, user_email, user_name, create_date, comment FROM
      public.article_comment where project=$1 and url=$2 order by create_date desc;`;
  let article_comment_list = await sql.query(script, values);
  return res.status(200).json({ article_comment_list });
}