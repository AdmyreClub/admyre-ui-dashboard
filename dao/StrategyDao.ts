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
  profiles: string[];
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
    const newList = await this.prisma.list.create({
      data: {
        strategyId,
        name: listDetails.name || '',
        profiles: listDetails.profiles,
      },
    });

    if (!listDetails.name) {
      await this.prisma.list.update({
        where: { id: newList.id },
        data: { name: `List ${newList.id}` },
      });
    }

    return this.prisma.list.findUnique({
      where: { id: newList.id },
    }) as Promise<List>;
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

  async updateListName(listId: string, newName: string): Promise<List> {
    return this.prisma.list.update({
      where: { id: listId },
      data: { name: newName },
    });
  }

  async updateStrategyDetails(strategyId: string, strategyDetails: StrategyDetails): Promise<Strategy> {
    return this.prisma.strategy.update({
      where: { id: strategyId },
      data: {
        name: strategyDetails.name,
        pictureUrl: strategyDetails.pictureUrl,
        description: strategyDetails.description,
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

}

const strategyDao = new StrategyDao();

export default strategyDao;
