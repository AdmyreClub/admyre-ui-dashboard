// /pages/api/strategy/lists/manage-profiles/add/[listId].ts
import { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const userId = auth(); // Make sure to pass `req` to `auth()` if it's required to extract the userID
    let listId = req.query.listId;

    // Ensure listId is a string
    if (Array.isArray(listId)) {
        listId = listId[0];
    }

    if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const influencerData = req.body;

    if (!influencerData.socialHandles || influencerData.socialHandles.length === 0 || !listId) {
        return res.status(400).json({ message: 'Missing required details (influencer details or list ID)' });
    }

    try {
        const updatedProfiles = await strategyDao.addProfileToList(listId, influencerData);
        return res.status(201).json(updatedProfiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add the profile to the list', error });
    }
}
