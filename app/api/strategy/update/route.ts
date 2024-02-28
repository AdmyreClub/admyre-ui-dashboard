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
    const strategyId = url.searchParams.get('q');
    const name = url.searchParams.get('name');
    const pictureUrl = url.searchParams.get('pictureUrl') ?? undefined;
    const description = url.searchParams.get('description') ?? undefined;

    // Validate the input
    if (!strategyId || !name) { // Ensuring minimum required fields are present
        return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        // Update the strategy details
        const updatedStrategy = await strategyDao.updateStrategyDetails(strategyId, { name, pictureUrl, description });
        return new NextResponse(JSON.stringify(updatedStrategy), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating strategy:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
