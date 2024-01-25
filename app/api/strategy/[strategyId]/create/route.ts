// /pages/api/strategy/[strategyId]/create.ts
import { NextRequest, NextResponse } from "next/server";
import strategyDao from '@/dao/StrategyDao';
import { auth } from '@clerk/nextjs';

async function POST(req: NextRequest) {
    const { userId } = auth(req);

    if (!userId) {
        return new NextResponse(JSON.stringify({ message: 'User ID not provided' }), { status: 400 });
    }

    const strategyId = req.page.params?.strategyId;
    if (!strategyId) {
        return new NextResponse(JSON.stringify({ message: 'Strategy ID not provided' }), { status: 400 });
    }

    try {
        const body = await req.json();
        const { name, profiles } = body;

        if (!Array.isArray(profiles) || profiles.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'Profiles array is missing or empty' }), { status: 400 });
        }

        const newList = await strategyDao.createList(strategyId, { name, profiles });
        return new NextResponse(JSON.stringify(newList), { status: 201 });
    } catch (error) {
        console.error('Error creating list:', error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error for create list', error: error.message }), { status: 500 });
    }
}

export { POST };
