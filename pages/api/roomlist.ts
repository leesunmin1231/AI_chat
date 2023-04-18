import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ROOMS } from '@/db';
import { RoomType } from '@/types/RoomResponse';

type Data = {
  message: string;
  list: RoomType[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'success', list: ROOMS.get });
  }
  if (req.method === 'POST') {
    const bodyData: Omit<RoomType, 'id'> = req.body;
    ROOMS.set = ROOMS.get.concat([{ ...bodyData, id: nanoid() }]);
    res.status(200).json({ message: 'success', list: ROOMS.get });
  }
  if (req.method === 'PUT') {
    const bodyData: RoomType = req.body;
    ROOMS.set = ROOMS.get.map((room) => (room.id === bodyData.id ? { ...bodyData } : room));
    res.status(200).json({ message: 'success', list: ROOMS.get });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    ROOMS.set = ROOMS.get.filter((room) => room.id !== id);
    res.status(200).json({ message: 'success', list: ROOMS.get });
  }
}
