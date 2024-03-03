import {
  PrismaClient,
  Campaign,
  CampaignStatus,
  Deliverable,
  Incentive,
} from "@prisma/client";
import ICampaignDao from "@/dao/interfaces/ICampaignDao";

enum CampaignType {
  BARTER = "BARTER",
  PAYOUT = "PAYOUT",
  CASHBACK = "CASHBACK",
}

interface InitCampaignModel {
  platform: string; // Use lowercase for types
  campaignType: string; // camelCase for properties
  name: string;
  brandName: string;
}

interface DeliverablesModel {
  platform: string;
  // Add necessary properties here
  contentType: string;
  postingTime: string;
  startDate: Date | null;
  endDate: Date | null;
  contentGuidelines: string;
}

const prisma = new PrismaClient();

class CampaignDao implements ICampaignDao {
  async getAllCampaigns(userId: string): Promise<Campaign[]> {
    return prisma.campaign.findMany({
      where: {
        userId,
      },
    });
  }

  async addCampaign(
    userId: string,
    initCampaign: InitCampaignModel,
  ): Promise<Campaign> {
    const campaign = await prisma.campaign.create({
      data: {
        userId,
        platform: initCampaign.platform,
        type: initCampaign.campaignType, // Assuming 'type' field exists and is compatible
        name: initCampaign.name,
        brandName: initCampaign.brandName,
        status: "DRAFT", // Directly using the enum might require mapping to the string value expected by Prisma
      },
    });
    return campaign as Campaign; // Explicit casting, if necessary
  }

  async createCampaignOne(
    campaignId: string,
    name: string,
    brandName: string,
  ): Promise<Campaign> {
    return prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        name,
        brandName,
        // Update updatedAt automatically, Prisma handles this with @updatedAt
      },
    });
  }

  async createCampaignTwo(
    campaignId: string,
    aboutBrand: string,
    campaignOverview: string,
  ): Promise<Campaign> {
    return prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        description: `${aboutBrand} ${campaignOverview}`, // Combine into one field or adjust schema accordingly
      },
    });
  }

  async addDeliverable(
    campaignId: string,
    deliverables: DeliverablesModel[],
  ): Promise<Campaign> {
    await prisma.$transaction(
      deliverables.map((deliverable) =>
        prisma.deliverable.create({
          data: {
            campaignId,
            platform: deliverable.platform,
            contentType: deliverable.contentType,
            postingTime: deliverable.postingTime,
            startDate: deliverable.startDate,
            endDate: deliverable.endDate,
            contentGuidelines: deliverable.contentGuidelines,
          },
        }),
      ),
    );
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });
    if (!campaign) throw new Error(`Campaign with ID ${campaignId} not found.`);
    return campaign;
  }

  async addIncentive(
    campaignId: string,
    incentive: Incentive,
  ): Promise<Campaign> {
    await prisma.incentive.create({
      data: {
        campaignId,
        type: incentive.type,
        payoutAmount: incentive.payoutAmount,
        voucherWorth: incentive.voucherWorth,
        voucherDescription: incentive.voucherDescription,
      },
    });
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });
    if (!campaign) throw new Error(`Campaign with ID ${campaignId} not found.`);
    return campaign;
  }

  async setCampaignStatus(
    campaignId: string,
    status: CampaignStatus,
  ): Promise<Campaign> {
    return prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        status,
      },
    });
  }
}

const campaignDao = new CampaignDao();

export default campaignDao;
