// /pages/api/campaign/add.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import campaignDao from '@/dao/CampaignDao';
import { auth } from '@clerk/nextjs';

// Make sure to use the correct type for `req`. It should be `NextApiRequest`.
export async function POST(req: Request) {
    // Extracting the user ID using your authentication method
    const { userId } = auth(); // Ensure that `auth` function is adapted to accept `req` if needed.

    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'Authentication required' }), { status: 401 });
    }

    // Assuming `req.body` is directly accessible as an object. If not, you might need to parse it explicitly.
    const initCampaign = req.body;

    // Validate that `initCampaign` is not null and has the required properties.
    if (!initCampaign || !initCampaign.platform || !initCampaign.name || !initCampaign.brandName) {
        return new NextResponse(JSON.stringify({ message: 'Missing required campaign details' }), { status: 400 });
    }

    try {
        // Adding the campaign using the DAO function
        const campaign = await campaignDao.addCampaign(userId, initCampaign);
        return new NextResponse(JSON.stringify(campaign), { status: 201 });
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Failed to add the campaign', error }), { status: 500 });
    }
}

// Note: This exports the function but does not make it a valid Next.js API route handler.
// You might want to wrap this function in an API route handler or export it as `default`.
