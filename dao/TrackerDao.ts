import ITrackerDao from "@/dao/interfaces/ITrackerDao";
import { Content, Influencer, List, PrismaClient } from "@prisma/client";

class TrackerDao implements ITrackerDao {
  private prisma: PrismaClient;

  async addPostToTracker(userId: String, url: String): Promise<List> {}
  async addProfileToTracker(userId: String, url: String): Promise<List> {}
  async trackPost(userId: String, url: String): Promise<Content> {}
  async trackProfile(userId: String, url: String): Promise<Influencer> {}
}

const trackerDao = new TrackerDao();

export default trackerDao;
