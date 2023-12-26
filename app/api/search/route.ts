import axios from 'axios';
import { auth } from '@clerk/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

interface Filters {
  username?: string;
  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
  age?: {
    from?: number;
    to?: number;
  };
  categories?: string[];
  followers?: {
    from?: number;
    to?: number;
  };
  followings?: {
    from?: number;
    to?: number;
  };
  engagementRate?: number;
  gender?: string;
  languages?: string[];
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const body = req.body instanceof ReadableStream ? await req.json() : req.body;
    console.log('here is the request: ', body);
    const { filters, page = 0, pageSize = 10 } = body;

    const options = {
      method: 'POST',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gfxln/endpoint/search',
      headers: { 'Content-Type': 'application/json' },
      data: { filters, page, pageSize }
    };

    const response = await axios.request(options);
    //console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500 });
  }
}
