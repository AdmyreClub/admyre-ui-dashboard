import { Content, Influencer, List } from "@prisma/client";

interface ITrackerDao {
  addPostToTracker(userId: String, url: String): Promise<List>;
  addProfileToTracker(userId: String, url: String): Promise<List>;
  trackPost(userId: String, url: String): Promise<Content>;
  trackProfile(userId: String, url: String): Promise<Influencer>;
}

export default ITrackerDao;
