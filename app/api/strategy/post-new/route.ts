import type { NextApiRequest, NextApiResponse } from 'next';
import strategyDao from '@/dao/StrategyDao';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, name, pictureUrl, description } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStrategy = await strategyDao.createStrategy(userId, { name, pictureUrl, description });
    res.status(201).json(newStrategy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error for create strategy' });
  }
}
