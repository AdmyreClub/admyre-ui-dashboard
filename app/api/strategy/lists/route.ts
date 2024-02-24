// /pages/api/strategy/lists/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    // We call `auth` to ensure that only authenticated users can access this endpoint.
    const userId = auth();

    // If `auth` returns null or undefined, it means the user is not authenticated.
    // We send a 401 Unauthorized response in this case.
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'User not authenticated' }), {
            status: 401,
          });
    }

    // Try to extract the `strategyId` from the URL's search parameters.
    // This assumes that `req` is an instance of `NextRequest`, which may not be true for older Next.js versions.

    console.log('/n/n/n API REQUESTTT', req.nextUrl.searchParams.get('q'));
    const strategyId = req.nextUrl.searchParams.get('q');

    // We check if `strategyId` is present and if it's a string.
    // // UUIDs are strings, so we want to ensure we're getting the correct type.
    if (!strategyId) {
        return new NextResponse(JSON.stringify({ message: 'Invalid strategy ID' }), {
          status: 400,
        });
      }

    // We then try to fetch the lists associated with the `strategyId` from our data access object (DAO).
    // This is wrapped in a try-catch block to handle any potential errors that might occur during the database operation.
    try {
        const lists = await strategyDao.getAllLists(strategyId);
        return new NextResponse(JSON.stringify(lists), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    } catch (error) {
        // If an error occurs, we log it and send a 500 Internal Server Error response.
        // This is a catch-all for any unhandled errors in our try block.
        console.error('Error fetching lists:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
          status: 500,
        });
    }
}
