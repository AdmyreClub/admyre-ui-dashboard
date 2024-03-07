// /pages/api/list/view-all-profiles.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import strategyDao from '@/dao/StrategyDao'; // Adjust the import path as necessary
import { auth } from '@clerk/nextjs';

export async function GET(req: Request, res: NextApiResponse) {
    // Assuming `auth` requires `req` to extract the user's session or token
    const userId = auth(); // Make sure this matches how you've implemented `auth`

    // Using NextResponse for responding, ensure that the content type is set for JSON responses
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'Authentication required' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Extracting list ID from query parameters and ensuring it's a string
    const listId = typeof req.query.listId === 'string' ? req.query.listId : null;

    if (!listId) {
        return new NextResponse(JSON.stringify({ message: 'List ID is required' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const influencers = await strategyDao.viewAllProfilesInList(listId);
        return new NextResponse(JSON.stringify(influencers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Failed to retrieve influencers', error: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

