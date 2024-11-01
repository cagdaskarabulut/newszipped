"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

// is liked by user?
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName, url?.toString()];
  const script = `SELECT count(id) FROM public.article_comment where project=$1 and url=$2;`;
  let commentCount = await sql.query(script, values);
  return res.status(200).json({ commentCount });
}