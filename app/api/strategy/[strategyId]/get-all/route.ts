// /pages/api/strategy/[strategyId]/get-all/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';

// Named export for the GET method
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const userId = auth();

    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    const { strategyId } = req.query;

    if (!strategyId || typeof strategyId !== 'string') {
        res.status(400).json({ message: 'Invalid strategy ID' });
        return;
    }

    try {
        const lists = await strategyDao.getAllLists(strategyId);
        res.status(200).json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
