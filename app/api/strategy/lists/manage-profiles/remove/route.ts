// /pages/api/profile/remove-from-list.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import strategyDao from '@/dao/StrategyDao'; // Adjust the import path as necessary
import { auth } from '@clerk/nextjs';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // Extracting the user ID using your authentication method
    const { userId } = auth(); // Adjust based on your actual auth method

    if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    // Parsing the request body to get the list ID and influencer username
    const { listId, username } = req.body;

    // Validating the request data
    if (!listId || !username) {
        return res.status(400).json({ message: 'Missing required data: listId or username' });
    }

    try {
        // Removing the profile from the list using the DAO function
        const influencers = await strategyDao.removeProfilesFromList(listId, username);
        return res.status(200).json(influencers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to remove the profile from the list', error: error });
    }
}
