// /pages/api/campaign/get-all.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import campaignDao from '@/dao/CampaignDao';
import { auth } from '@clerk/nextjs';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // Assuming auth() correctly retrieves the current user's ID
    const {userId} = auth();

    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'User ID not provided' }), { status: 400 });
    }

    try {
        const campaigns = await campaignDao.getAllCampaigns(userId);
        return NextResponse.json(campaigns);
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error while getting all campaigns', error }), { status: 500 });
    }
}
