
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST (
    req:Request
) {
    try {
        const userId = auth();
        const body = await req.json();
        const {messages} = body;

        if(!userId){
            return new NextResponse("Unauthorised", {status: 401 })
        }
        if(!messages){
            return new NextResponse("Messages are required", {status: 400})
        }

        const freeTrial = await checkApiLimit();
        if(!freeTrial){
            return new NextResponse("Free trial has expired", {status: 403});
        }
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        await increaseApiLimit();

        return NextResponse.json(response.choices[0].message)
    } catch(error){
        console.log("Conversation_error: ", error);
        return new NextResponse("Internal error", {status: 500});
    }
}
