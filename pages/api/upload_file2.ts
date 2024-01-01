import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'

export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string
export default async function POST(req: Request) {
  console.log(req);
  const file = req.body || ''
  const contentType = req.headers.get('content-type') || 'text/plain'
  const url = req.url;
  
  const blob = await put(url, file, {
    contentType,
    access: 'public',
  })

  return NextResponse.json(blob)
}