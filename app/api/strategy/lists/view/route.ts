// /pages/api/strategy/lists/view.ts
import { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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
        const list = await strategyDao.getListById(listId);

        // Check if 'profiles' is a string before parsing it.
        if (list.profiles && typeof list.profiles === 'string') {
            list.profiles = JSON.parse(list.profiles as string);
        } else {
            list.profiles = []; // Ensure it's an array if not already.
        }

        return new NextResponse(JSON.stringify(list), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error retrieving list:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}
