// /pages/api/strategy/[strategyId]/get-all.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure that the user is authenticated
    const { userId } = auth();
    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'user id not'}), { status: 400 });
    }

    // Extract strategyId from the URL
    const { strategyId } = req.query;

    // Ensure that strategyId is provided
    if (!strategyId || Array.isArray(strategyId)) {
        return new NextResponse(JSON.stringify({ message: 'Invalid strategy ID'}), { status: 400 });
    }

    try {
        // Fetch all lists associated with the strategyId
        const lists = await strategyDao.getAllLists(strategyId);
        res.status(200).json(lists);
    } catch (error) {
        console.error('Error fetching lists for strategy:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error for getting all strategies', error }), { status: 500 });
    }
}
