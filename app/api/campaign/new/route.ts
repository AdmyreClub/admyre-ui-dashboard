// /pages/api/campaign/add.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import campaignDao from '@/dao/CampaignDao';
import { auth } from '@clerk/nextjs';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // Extracting the user ID using your authentication method
    const {userId} = auth();

    if (!userId) {
        return res.status(400).json({ message: 'Authentication required' });
    }

    // Parsing the request body to get campaign details
    const initCampaign = req.body;

    // Validating the campaign details (you might want to add more robust validation depending on your requirements)
    if (!initCampaign.platform || !initCampaign.name || !initCampaign.brandName) {
        return res.status(400).json({ message: 'Missing required campaign details' });
    }

    try {
        // Adding the campaign using the DAO function
        const campaign = await campaignDao.addCampaign(userId, initCampaign);
        return res.status(201).json(campaign);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add the campaign', error });
    }
}
