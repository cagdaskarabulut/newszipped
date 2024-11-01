import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// import {authOptions} from "../auth/[...nextauth]/route";
import { authOptions } from "../../options";


export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ name: session?.user?.name ?? undefined });
}
