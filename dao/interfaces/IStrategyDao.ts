// allows to create new strategies

// can create lists in those strategies

// can store data in those lists (it probably should get real time data)

// and that data must be stored as json array inside the list

import { Influencer, List, Strategy } from "@prisma/client";

interface StrategyDetails {
  name: string;
  pictureUrl?: string;
  description?: string;
}

interface ListDetails {
  name?: string;
  profiles?: String[];
}

interface IStrategyDao {
  createStrategy(
    userId: string,
    strategyDetails: StrategyDetails,
  ): Promise<Strategy>;
  createList(strategyId: string, listDetails: ListDetails): Promise<List>;
  addProfileToList(listId: string, profiles: any[]): Promise<Influencer[]>;
  removeProfilesFromList(
    listId: string,
    username: string,
  ): Promise<Influencer[]>;
  updateListName(listId: string, newName: string): Promise<List>;
  updateStrategyDetails(
    userId: string,
    strategyDetails: StrategyDetails,
  ): Promise<Strategy>;
  getAllStrategies(userId: string): Promise<Strategy[]>;
  getAllLists(strategyId: string): Promise<List[]>;
  viewAllProfilesInList(listId: string): Promise<Influencer[]>
}

export default IStrategyDao;
