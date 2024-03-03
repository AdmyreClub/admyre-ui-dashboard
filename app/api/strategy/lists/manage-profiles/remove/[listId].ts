// Import necessary modules and types
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@clerk/nextjs';
import strategyDao from '@/dao/StrategyDao';

// Define the POST method for the API endpoint
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // Authenticate the user
    const userId = auth(); // Ensure to pass `req` to `auth()` if needed
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    // Extract listId from the dynamic route and username from query parameters
    const { listId } = req.query;
    const username = req.query.q as string;

    // Validate inputs
    if (!listId || typeof listId !== 'string') {
        return res.status(400).json({ message: 'Invalid list ID' });
    }
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    // Attempt to remove the profile from the list
    try {
        const updatedProfiles = await strategyDao.removeProfilesFromList(listId, username);
        return res.status(200).json(updatedProfiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to remove the profile from the list', error });
    }
}
