import {
  PrismaClient,
  Strategy,
  List,
  Influencer,
  Prisma,
} from "@prisma/client";
import IStrategyDao from "@/dao/interfaces/IStrategyDao";
import prismadb from "@/lib/prismadb";
import { THUMBNAIL } from "@/constants";

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


interface StrategyDetails {
  name: string;
  pictureUrl?: string;
  description?: string;
}

interface ListDetails {
  name?: string; // handle default naming
  profiles?: string[];
}

class StrategyDao implements IStrategyDao {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismadb;
  }

  async createStrategy(
    userId: string,
    strategyDetails: StrategyDetails,
  ): Promise<Strategy> {
    return this.prisma.strategy.create({
      data: {
        userId,
        name: strategyDetails.name,
        pictureUrl: strategyDetails.pictureUrl,
        description: strategyDetails.description,
      },
    });
  }

  async createList(
    strategyId: string,
    listDetails: ListDetails,
  ): Promise<List> {
    let name = listDetails.name;
    if (!name) {
      // Fetch the count of existing lists for the strategy to generate a default name.
      const count = await this.prisma.list.count({
        where: { strategyId },
      });
      name = `Untitled #${count + 1}`;
    }

    return this.prisma.list.create({
      data: {
        strategyId,
        name,
        profiles: listDetails.profiles || [],
      },
    });
  }

  async addOrUpdateInfluencerAndLinkToList(listId: string, influencerData: InfluencerJSON): Promise<void> {
    const instagramData = influencerData.socialHandles.find(handle => handle.platform === "INSTAGRAM");
    if (!instagramData) {
      throw new Error("Instagram data not found for influencer");
    }

    // Attempt to fetch the influencer by unique identifier (e.g., Instagram handle)
    let influencer = await this.prisma.influencer.findUnique({
      where: { username: instagramData.handle },
    });

    // Influencer data mapping
    const influencerPayload = {
      username: instagramData.handle,
      url: instagramData.url,
      profilePictureUrl: influencerData.profileImage.url,
      email: influencerData.email,
      phoneNumber: influencerData.phone,
      whatsappNumber: influencerData.whatsappNumber,
      gender: influencerData.gender,
      platformName: "INSTAGRAM",
      followerCount: instagramData.metrics.followers,
      followingCount: instagramData.metrics.following,
      totalLikesCount: instagramData.metrics.avgLikes * (instagramData.metrics.numOfPosts ?? 0),
      totalCommentsCount: instagramData.metrics.avgComments * (instagramData.metrics.numOfPosts ?? 0),
      avgCommentsCount: instagramData.metrics.avgComments,
      avgLikesCount: instagramData.metrics.avgLikes,
      engagementRate: instagramData.metrics.avgEngagement,
      // Add other fields mapped appropriately
    };

    if (influencer) {
      // Update existing influencer
      await this.prisma.influencer.update({
        where: { username: instagramData.handle },
        data: influencerPayload,
      });
    } else {
      // Create new influencer
      influencer = await this.prisma.influencer.create({
        data: influencerPayload,
      });
    }

    // Link to ListInfluencer table if not already linked
    const existingLink = await this.prisma.listInfluencer.findUnique({
      where: {
        listId_influencerId: {
          listId,
          influencerId: influencer.id,
        },
      },
    });

    if (!existingLink) {
      await this.prisma.listInfluencer.create({
        data: {
          listId,
          influencerId: influencer.id,
        },
      });
    }
  }

  async addProfileToList(
    listId: string,
    influencerData: any,
  ): Promise<Influencer[]> {
    // Check if the influencer already exists in the database by Instagram handle
    let influencer = await prismadb.influencer.findUnique({
      where: { username: influencerData.socialHandles[0].handle },
    });

    if (!influencer) {
      const instagramMetrics = influencerData.socialHandles.find(
        (handle: any) => handle.platform === "INSTAGRAM",
      )?.metrics;

      influencer = await prismadb.influencer.create({
        data: {
          username: influencerData.socialHandles[0].handle,
          url: influencerData.socialHandles[0].url,
          profilePictureUrl: influencerData.profileImage.url,
          email: influencerData.email,
          phoneNumber: influencerData.phone,
          whatsappNumber: influencerData.whatsappNumber,
          city: influencerData.city,
          state: influencerData.state,
          country: influencerData.country,
          gender: influencerData.gender,
          platformName: "INSTAGRAM",
          followerCount: instagramMetrics?.followers || 0,
          followingCount: instagramMetrics?.following || 0,
          totalLikesCount: instagramMetrics?.avgLikes || 0,
          totalCommentsCount: instagramMetrics?.avgComments || 0,
          avgCommentsCount: instagramMetrics?.avgComments || 0,
          avgLikesCount: instagramMetrics?.avgLikes || 0,
          engagementRate: instagramMetrics?.avgEngagement || 0,
          source: "search",
        },
      });
    }

    const list = await prismadb.list.findUnique({
      where: { id: listId },
      select: { profiles: true },
    });

    if (!list || list.profiles === null) {
      throw new Error("List not found");
    }

    // Ensuring that profiles is a string before parsing
    let existingProfiles =
      typeof list.profiles === "string" ? JSON.parse(list.profiles) : [];
    if (!existingProfiles.includes(influencer.id)) {
      existingProfiles.push(influencer.id);
      await prismadb.list.update({
        where: { id: listId },
        data: { profiles: JSON.stringify(existingProfiles) },
      });
    }

    // Fetching the updated list of influencer IDs after adding the new influencer
    const updatedList = await prismadb.list.findUnique({
      where: { id: listId },
      select: { profiles: true },
    });

    if (!updatedList || updatedList.profiles === null) {
      throw new Error("Failed to update the list with new influencer");
    }

    // Ensuring that profiles is a string before parsing
    const updatedInfluencerIds =
      typeof updatedList.profiles === "string"
        ? JSON.parse(updatedList.profiles)
        : [];

    return prismadb.influencer.findMany({
      where: {
        id: { in: updatedInfluencerIds },
      },
    });
  }

  async removeProfilesFromList(
    listId: string,
    username: string,
  ): Promise<Influencer[]> {
    const influencer = await this.prisma.influencer.findUnique({
      where: { username },
    });
    if (!influencer) throw new Error("Influencer does not exist.");

    const list = await this.prisma.list.findUnique({
      where: { id: listId },
    });
    if (!list || typeof list.profiles !== "string")
      throw new Error("List not found or invalid profiles data");

    let profiles = JSON.parse(list.profiles) as string[];
    profiles = profiles.filter((id) => id !== influencer.id);

    await this.prisma.list.update({
      where: { id: listId },
      data: { profiles: JSON.stringify(profiles) },
    });

    // Return the updated list of influencers
    return this.prisma.influencer.findMany({
      where: {
        id: { in: profiles },
      },
    });
  }

  async viewAllProfilesInList(listId: string): Promise<Influencer[]> {
    // Fetch all ListInfluencer records that match the given listId,
    // including the influencer details for each record
    const listInfluencers = await this.prisma.listInfluencer.findMany({
      where: {
        listId: listId,
      },
      include: {
        influencer: true, // Include the influencer details
      },
    });

    // Extract the Influencer objects from the listInfluencers query result
    const influencers = listInfluencers.map((li) => li.influencer);

    return influencers;
  }


  async updateListName(listId: string, newName: string): Promise<List> {
    // Check if newName is provided and not just whitespace
    if (!newName || newName.trim() === "") {
      // Fetch the existing lists to find the next available default name
      const untitledCount = await this.prisma.list.count({
        where: {
          name: {
            startsWith: "Untitled",
          },
        },
      });

      // Generate a default name
      newName = `Untitled #${untitledCount + 1}`;
    }

    // Proceed to update the list with either the provided name or the generated default name
    return this.prisma.list.update({
      where: { id: listId },
      data: { name: newName },
    });
  }

  async updateStrategyDetails(
    strategyId: string,
    strategyDetails: StrategyDetails,
  ): Promise<Strategy> {
    // Generate a default name if none is provided, using a simple pattern or querying for the next available index
    let { name, pictureUrl, description } = strategyDetails;

    // If no name is provided, generate a default one
    if (!name || name.trim() === "") {
      // Fetch the count of existing strategies with "Untitled" in their name to generate a unique default name
      const untitledCount = await this.prisma.strategy.count({
        where: {
          name: {
            startsWith: "Untitled",
          },
        },
      });
      name = `Untitled #${untitledCount + 1}`;
    }

    // Provide a default picture URL if none is provided
    if (!pictureUrl || pictureUrl.trim() === "") {
      pictureUrl =
       THUMBNAIL; // Replace this with your actual default picture URL
    }

    // Update the strategy with the provided or default values
    return this.prisma.strategy.update({
      where: { id: strategyId },
      data: {
        name,
        pictureUrl,
        description,
      },
    });
  }

  async getAllStrategies(
    userId: string,
  ): Promise<(Strategy & { listCount: number })[]> {
    const strategies = await this.prisma.strategy.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const strategiesWithListCount = await Promise.all(
      strategies.map(async (strategy) => {
        const listCount = await this.prisma.list.count({
          where: {
            strategyId: strategy.id,
          },
        });

        return {
          ...strategy,
          listCount,
        };
      }),
    );

    return strategiesWithListCount;
  }

  async getAllLists(strategyId: string): Promise<List[]> {
    console.log("BRO HERE IS THE strategy id:", strategyId);
    const allLists = await this.prisma.$queryRaw<
      List[]
    >`SELECT * FROM List WHERE strategyId = ${strategyId}`;
    return allLists;
  }

  async getListById(listId: string): Promise<List> {
    const list = await this.prisma.list.findUnique({
      where: { id: listId },
    });

    if (!list) throw new Error("List not found");

    return list;
  }
}

const strategyDao = new StrategyDao();

export default strategyDao;
