// pages/api/locations.ts

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@clerk/nextjs/api';
import { NextResponse } from 'next/server';

// Define the structure of the response data
interface LocationResponse {
  // Define the expected properties of your locations response
  cities: string[];
  states: string[];
  countries: string[];
}

// This function only responds to GET requests
export async function GET(req: Request, res: NextApiResponse) {
  try {
    const options = {
      method: 'GET',
      url: 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gfxln/endpoint/get_locations',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await axios.request(options);
    //console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500 });
  }
};
