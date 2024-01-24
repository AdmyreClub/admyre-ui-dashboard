// /pages/api/strategy/get-all.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const userId = typeof req.query.userId === 'string' ? req.query.userId : '';
    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    try {
        const strategies = await strategyDao.getAllStrategies(userId);
        res.status(200).json(strategies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error for getting all strategies' });
    }
}
