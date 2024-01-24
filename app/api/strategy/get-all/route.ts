// /pages/api/strategy/get-all.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const {userId} = auth();

    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'user id not'}), { status: 400 });
    }

    try {
        const strategies = await strategyDao.getAllStrategies(userId);
          return NextResponse.json(strategies);
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error for getting all strategies', error }), { status: 500 });
    }
}

