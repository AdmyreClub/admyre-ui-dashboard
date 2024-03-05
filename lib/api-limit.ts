import {auth} from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'
import { MAX_FREE_COUNT } from '@/constants'

export const increaseApiLimit =async () => {
    const {userId} = auth();

    if(!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if(userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {userId: userId},
            data:{count: userApiLimit.count + 1},
        });
    } else {
        await prismadb.userApiLimit.create({
            data:{userId: userId, count: 1}
        });
    }
}

export const checkApiLimit = async () => {
    const {userId} = auth();

    if(!userId){
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    });

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
        return true;
    } else {
        return false;
    }

}

export const getApiLimitCount = async () => {
    const {userId} = auth();

    if(!userId){
        return 0;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if(!userApiLimit){
        return 0
    }

    return userApiLimit.count;
}


// this is where i suppose, i need to define the tokens required for each operation

// i guess tokens need to be of four types

// token A - for limiting manual filter results

//token B - for limiting AI based filter results

// token C - for tracking of data

// token D - for importing external data for enrichment

// token A system: 250 tokens (1 token per row of result)

// token B system: 100 tokens (1 token per row of result)

// token C system: for post tracking (5 token per day of tracking) & profile tracking (5 tokens per day of tracking)

// token D system: pulling data costs 2 tokens per validated row (no tokens deducted for invalid urls)

// with contact information, straight up 5 more tokens are deducted

// 1000 tokens
