import { NextRequest, NextResponse } from 'next/server';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';

export async function POST(req: NextRequest) {
    // Authenticate the user
    const userId = auth(); // Adjust based on actual auth function usage
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'User not authenticated' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Extract details from the URL's query parameters
    const url = req.nextUrl;
    const listId = url.searchParams.get('listId');
    const newName = url.searchParams.get('name') ?? ""; // Default to empty string if not provided

    // Validate the input: listId is required
    if (!listId) {
        return new NextResponse(JSON.stringify({ message: 'Missing required list ID' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        // Directly call updateListName which internally handles default naming if newName is empty
        const updatedList = await strategyDao.updateListName(listId, newName);

        return new NextResponse(JSON.stringify(updatedList), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating list:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
