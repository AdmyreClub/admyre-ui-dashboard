import axios from 'axios';
import { auth } from '@clerk/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

interface Filters {
  keywords?: string[];
  location?: string[];
  age?: {
    from?: number | null;
    to?: number | null;
  };
  categories?: string[];
  followers?: {
    from: number;
    to: number;
  };
  followings?: {
    from: number;
    to: number;
  };
  engagementRate?: {
    from: number;
    to: number;
  }; // Now an object with from and to
  gender?: string;
  languages?: string[];
}


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.rewrite(new URL('/401', req.url));
    }
    //console.log("this is the next request", req);
    const body = await req.json();
    console.log('Received request: ', body);

    // Ensure filters are properly structured
    const filters: Filters = {
      ...body.filters
    };

    const page = body.page || 0;
    const pageSize = body.pageSize || 10;

    const requestData = {
      filters,
      page,
      pageSize
    };

    const options = {
      method: 'POST',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gfxln/endpoint/search',
      headers: { 'Content-Type': 'application/json' },
      data: requestData
    };

    const response = await axios.request(options);
    return new NextResponse(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in POST function:', error);

    if (axios.isAxiosError(error) && error.response) {
      return new NextResponse(JSON.stringify({
        message: 'Error with Axios request',
        error: error.message,
        details: error.response.data,
        status: error.response.status,
      }), {
        status: error.response.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify({
      message: 'Internal Server Error',
      error: error || error.toString(),
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
