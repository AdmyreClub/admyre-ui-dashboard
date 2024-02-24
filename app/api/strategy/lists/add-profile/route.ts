// pages/api/strategy/lists/add-profile.ts
import { NextRequest, NextResponse } from 'next/server';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
    const userId = auth();

    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'User not authenticated' }), {
            status: 401,
        });
    }

    const listId = req.nextUrl.searchParams.get('q');

    if (!listId) {
        return new NextResponse(JSON.stringify({ message: 'Invalid list ID' }), {
            status: 400,
        });
    }

    try {
        // Assuming the entire request body is the influencer data and it's an array
        const requestBody = await req.json();
        const profilesData = [requestBody]; // Wrap the single influencer data in an array

        // Call the DAO to add the influencer to the list
        const updatedList = await strategyDao.addProfilesToList(listId, profilesData);

        return new NextResponse(JSON.stringify(updatedList), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding profile to list:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}

export default function handler(req: NextRequest) {
    if (req.method === 'POST') {
        return POST(req);
    } else {
        // Handle any other HTTP methods as needed.
        return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), {
            status: 405,
        });
    }
}
