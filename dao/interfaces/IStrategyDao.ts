// allows to create new strategies

// can create lists in those strategies

// can store data in those lists (it probably should get real time data)

// and that data must be stored as json array inside the list

import { List, Strategy } from "@prisma/client";

interface StrategyDetails {
    name: string;
    pictureUrl?: string;
    description?: string;
  }

  interface ListDetails {
    name?: string;
    profiles: String[]
  }

interface IStrategyDao {
    createStrategy(userId: string, strategyDetails: StrategyDetails): Promise<Strategy>;
    createList(strategyId: string, listDetails: ListDetails): Promise<List>;
    addProfilesToList(listId: string, profiles: any[]): Promise<List>;
    updateListName(listId: string, newName: string) : Promise<List>;
    updateStrategyDetails(userId: string, strategyDetails: StrategyDetails): Promise<Strategy>;
    getAllStrategies(userId: string): Promise<Strategy[]>;
    getAllLists(strategyId: string): Promise<List[]>;
  }

export default IStrategyDao;
