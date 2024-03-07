"use server";

import { NextRequest, NextResponse } from "next/server";
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';

async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: 'User ID not provided' }), { status: 400 });
  }

  try {
    // Since req.body is a ReadableStream, we need to convert it to JSON
    const body = await req.json();
    const { name, pictureUrl, description } = body;

    if (!name) {
      return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const newStrategy = await strategyDao.createStrategy(userId, { name, pictureUrl, description });
    return new NextResponse(JSON.stringify(newStrategy), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error for create strategy', error: error.message }), { status: 500 });
  }
}

export { POST };
