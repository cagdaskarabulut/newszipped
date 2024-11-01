"use client"
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req?.query;
  const { user } = req?.query;
  const projectName = process.env.PROJECT_SITE_NAME;
  const values = [projectName, url?.toString(), user?.toString()];
  const script = `SELECT count(id) FROM public.article_like where project=$1 and url=$2 and user_email=$3;`;
  let likeCount = await sql.query(script, values);
  return res.status(200).json({ likeCount });
}