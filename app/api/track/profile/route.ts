import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // try {
  //   const userId = auth();

  //   const body = await req.json();
  //   const {username} = body;

  //   if(!userId){
  //     return new NextResponse("Unauthorised", {status: 401 })
  //   }
  //   if(!username) {
  //     return new NextResponse("Username is missing", {status: 400})
  //   }

  // }
}
