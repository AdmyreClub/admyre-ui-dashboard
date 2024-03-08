import ITrackerDao from "@/dao/interfaces/ITrackerDao";
import { Content, Influencer, List, PrismaClient } from "@prisma/client";

class TrackerDao {
  private prisma: PrismaClient;

}

const trackerDao = new TrackerDao();

export default trackerDao;
