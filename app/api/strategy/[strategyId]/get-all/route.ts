// /pages/api/strategy/[strategyId]/get-all.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = auth();

    if (!userId) {
        res.status(400).json({ message: 'User ID not provided' });
        return;
    }

    const { strategyId } = req.query;

    if (!strategyId || Array.isArray(strategyId)) {
        res.status(400).json({ message: 'Invalid strategy ID' });
        return;
    }

    try {
        const lists = await strategyDao.getAllLists(strategyId as string);
        res.status(200).json(lists);
    } catch (error) {
        console.error('Error fetching lists for strategy:', error);
        res.status(500).json({ message: 'Internal Server Error for getting all lists', error });
    }
}

