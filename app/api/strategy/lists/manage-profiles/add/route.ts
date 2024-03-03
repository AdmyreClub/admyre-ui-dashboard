
// /pages/api/profile/add-to-list.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import strategyDao from '@/dao/StrategyDao';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // Extracting the user ID using your authentication method
    const { userId } = auth(); // Make sure to pass req to auth() if needed

    if (!userId) {
        return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    // Parsing the request body to get influencer details
    const influencerData = req.body;

    // Basic validation of the influencer data
    if (!influencerData.socialHandles || influencerData.socialHandles.length === 0) {
        return NextResponse.json({ message: 'Missing required influencer details' }, { status: 400 });
    }

    try {
        // Assuming addProfileToList is a method of some DAO or service layer you have
        const updatedProfiles = await strategyDao.addProfileToList(userId, influencerData); // Adjust the function call as necessary
        return NextResponse.json(updatedProfiles, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to add the profile to the list', error: error }, { status: 500 });
    }
}
