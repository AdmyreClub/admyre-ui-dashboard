// /pages/api/strategy/lists/manage-profiles/add/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

interface SocialHandle {
    platform: string;
    handle: string;
    url: string;
    metrics: {
      followers: number;
      following: number;
      avgEngagement: number;
      avgLikes: number;
      avgComments: number;
      numOfPosts?: number;
      avgVideoViews?: number;
      subscribers?: number;
      totalVideos?: number;
      avgReach?: number;
    };
  }

interface InfluencerJSON {
    id: string;
    name: string;
    email: string;
    socialHandles: SocialHandle[];
    profileImage: {
      url: string;
    };
    gender: string;
    whatsappNumber: string;
    phone: string;
    // Add other relevant fields from your JSON structure
  }

export async function POST(req: NextRequest, res: NextApiResponse) {
    const userId = auth(); // Make sure to pass `req` to `auth()` if it's required to extract the userID
    const listId = typeof req.query.q === 'string' ? req.query.q : null;


    if (!userId) {
        return new NextResponse("Authentication required", {status: 401});
    }

    if (!listId) {
        return new NextResponse("'List ID is required", {status: 400});
    }
    const influencerData: InfluencerJSON = req.body;

    if (!influencerData.socialHandles || influencerData.socialHandles.length === 0 || !listId) {
        return new NextResponse('Missing required details (influencer details or list ID)', {status: 400});
    }

    try {
        const updatedProfiles = await strategyDao.addProfileToList(listId, influencerData);
        return res.status(201).json(updatedProfiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add the profile to the list', error });
    }
}
