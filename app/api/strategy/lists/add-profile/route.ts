// /pages/api/strategy/lists/add-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { fetchProfileData } from '@/lib/track'; // Ensure this is the correct path

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const userId = auth();

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: 'User not authenticated' }), {
      status: 401,
    });
  }

  const username = req.nextUrl.searchParams.get('q');

  if (!username) {
    return new NextResponse(JSON.stringify({ message: 'Username is required' }), {
      status: 400,
    });
  }

  try {
    const profileData = await fetchProfileData(username);

    const influencer = await prisma.influencer.create({
      data: profileData,
    });

    return new NextResponse(JSON.stringify(influencer), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Handling the specific error for account not found
    if (error.message === 'Account not found on Instagram!') {
      return new NextResponse(JSON.stringify({ message: 'Account not found on Instagram!' }), {
        status: 404,
      });
    } else {
      console.error('Error adding profile:', error);
      return new NextResponse(JSON.stringify({ message: 'Failed to add profile', error: error.message }), {
        status: 500,
      });
    }
  }
}
