import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

type Room = {
  id: string;
  name: string;
  people: number;
};

type Data = {
  message: string;
  list: Room[];
};

let ROOM_LIST: Room[] = [{ id: nanoid(), name: '방 1', people: 1 }];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'success', list: ROOM_LIST });
  }
  if (req.method === 'POST') {
    const bodyData: Omit<Room, 'id'> = req.body;
    ROOM_LIST.push({ ...bodyData, id: nanoid() });
    res.status(200).json({ message: 'success', list: ROOM_LIST });
  }
  if (req.method === 'PUT') {
    const bodyData: Room = req.body;
    ROOM_LIST = ROOM_LIST.map((room) => (room.id === bodyData.id ? { ...bodyData } : room));
    res.status(200).json({ message: 'success', list: ROOM_LIST });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    ROOM_LIST = ROOM_LIST.filter((room) => room.id === id);
    res.status(200).json({ message: 'success', list: ROOM_LIST });
  }
}
