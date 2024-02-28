import { PrismaClient, Strategy, List } from '@prisma/client';
import IStrategyDao from '@/dao/interfaces/IStrategyDao';
import prismadb from '@/lib/prismadb';

interface StrategyDetails {
  name: string;
  pictureUrl?: string;
  description?: string;
}

interface ListDetails {
  name?: string;  // handle default naming
  profiles?: string[];
}

class StrategyDao implements IStrategyDao {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismadb;
  }

  async createStrategy(userId: string, strategyDetails: StrategyDetails): Promise<Strategy> {
    return this.prisma.strategy.create({
      data: {
        userId,
        name: strategyDetails.name,
        pictureUrl: strategyDetails.pictureUrl,
        description: strategyDetails.description,
      },
    });
  }

  async createList(strategyId: string, listDetails: ListDetails): Promise<List> {
    let name = listDetails.name;
    if (!name) {
      // Fetch the count of existing lists for the strategy to generate a default name.
      const count = await this.prisma.list.count({
        where: { strategyId },
      });
      name = `Untitled #${count + 1}`; // Default name if none provided
    }

    return this.prisma.list.create({
      data: {
        strategyId,
        name,
        profiles: listDetails.profiles || [], // Provide an empty array if profiles are not provided
      },
    });
  }



  async addProfilesToList(listId: string, profiles: string[]): Promise<List> {
    const currentList = await this.prisma.list.findUnique({ where: { id: listId } });
    if (!currentList) throw new Error('List not found');

    // Parse the existing JSON field into an array, add new profiles, then stringify
    const existingProfiles = JSON.parse(currentList.profiles as string) as string[];
    const updatedProfiles = JSON.stringify([...existingProfiles, ...profiles]);

    return this.prisma.list.update({
      where: { id: listId },
      data: { profiles: updatedProfiles },
    });
  }

  async removeProfilesFromList(listId: string, profilesToRemove: string[]): Promise<List> {
    const currentList = await this.prisma.list.findUnique({ where: { id: listId } });
    if (!currentList) throw new Error('List not found');

    // Assuming profiles is a JSON field that contains an array of profile IDs
    const existingProfiles = JSON.parse(currentList.profiles as string) as string[];
    const updatedProfiles = existingProfiles.filter(profile => !profilesToRemove.includes(profile));

    return this.prisma.list.update({
        where: { id: listId },
        data: { profiles: JSON.stringify(updatedProfiles) },
    });
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


  async updateStrategyDetails(strategyId: string, strategyDetails: StrategyDetails): Promise<Strategy> {
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
      pictureUrl = "https://cdn.hypeauditor.com/img/instagram/user/13460080.jpg?w=100&till=1708507419&sign=be5247df95066c982795505571047925"; // Replace this with your actual default picture URL
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


  async getAllStrategies(userId: string): Promise<(Strategy & { listCount: number })[]> {
    const strategies = await this.prisma.strategy.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc'
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
    console.log('BRO HERE IS THE strategy id:', strategyId);
    const allLists = await this.prisma.$queryRaw<List[]>`SELECT * FROM List WHERE strategyId = ${strategyId}`;
    return allLists;
}

async getListById(listId: string): Promise<List> {
  const list = await this.prisma.list.findUnique({
      where: { id: listId },
  });

  if (!list) throw new Error('List not found');

  return list;
}


}

const strategyDao = new StrategyDao();

export default strategyDao;
