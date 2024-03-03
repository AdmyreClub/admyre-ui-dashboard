import {
  Campaign,
  Deliverable,
  Incentive,
  CampaignStatus,
} from "@prisma/client";

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

interface ICampaignDao {
  getAllCampaigns(userId: string): Promise<Campaign[]>;
  addCampaign(
    userId: string,
    initCampaign: InitCampaignModel,
  ): Promise<Campaign>;
  createCampaignOne(
    campaignId: string,
    name: string,
    brandName: string,
  ): Promise<Campaign>;
  createCampaignTwo(
    campaignId: string,
    aboutBrand: string,
    campaignOverview: string,
  ): Promise<Campaign>;
  addDeliverable(
    campaignId: string,
    deliverables: DeliverablesModel[],
  ): Promise<Campaign>;
  addIncentive(campaignId: string, incentive: Incentive): Promise<Campaign>;
  setCampaignStatus(
    campaignId: string,
    status: CampaignStatus,
  ): Promise<Campaign>;
}

export default ICampaignDao;
