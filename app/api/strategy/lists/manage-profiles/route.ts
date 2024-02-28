import { NextRequest, NextResponse } from "next/server";
import strategyDao from "@/dao/StrategyDao";
import { auth } from "@clerk/nextjs";

export async function POST(req: NextRequest) {
  const userId = auth();

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ message: "User not authenticated" }),
      {
        status: 401,
      }
    );
  }

  const listId = req.nextUrl.searchParams.get("q");

  if (!listId) {
    return new NextResponse(JSON.stringify({ message: "Invalid list ID" }), {
      status: 400,
    });
  }

  try {
    const { action, profiles } = await req.json();

    let updatedList;
    switch (action) {
      case "add":
        updatedList = await strategyDao.addProfilesToList(listId, profiles);
        break;
      case "delete":
        updatedList = await strategyDao.removeProfilesFromList(
          listId,
          profiles
        );
        break;
      default:
        return new NextResponse(JSON.stringify({ message: "Invalid action" }), {
          status: 400,
        });
    }

    return new NextResponse(JSON.stringify(updatedList), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error managing profile in list:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
}
