// /pages/api/strategy/lists/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const userId = auth();

    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'User not authenticated' }), {
            status: 401,
        });
    }

    const strategyId = req.nextUrl.searchParams.get('q');

    if (!strategyId) {
        return new NextResponse(JSON.stringify({ message: 'Invalid strategy ID' }), {
            status: 400,
        });
    }

    try {
        // Extract the list name from the request body, if provided.
        // Otherwise, fallback to a default name that will be set later.
        const requestBody = await req.json();
        const listName = requestBody.name;

        // Call the DAO to create the list.
        // If the list name isn't provided, pass undefined and handle the default naming in the DAO.
        const newList = await strategyDao.createList(strategyId, { name: listName });

        return new NextResponse(JSON.stringify(newList), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error creating list:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}
