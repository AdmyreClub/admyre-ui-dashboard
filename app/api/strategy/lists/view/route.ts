// /pages/api/list/view-all-profiles.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import strategyDao from '@/dao/StrategyDao'; // Adjust the import path as necessary
import { auth } from '@clerk/nextjs';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const userId = auth(); // Adjust based on your actual auth method

    if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    // Extracting list ID from query parameters
    const { listId } = req.query;

    if (!listId) {
        return res.status(400).json({ message: 'List ID is required' });
    }

    try {
        const influencers = await strategyDao.viewAllProfilesInList(listId as string);
        return res.status(200).json(influencers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve influencers', error: error });
    }
}
