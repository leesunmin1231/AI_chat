import type { NextApiRequest, NextApiResponse } from 'next';

type Room = {
  name: string;
  people: number;
};

type Data = {
  message: string;
  list: Room[];
};

const ROOM_LIST: Room[] = [{ name: '방 1', people: 1 }];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'success', list: ROOM_LIST });
  }
  if (req.method === 'POST') {
    const bodyData: Room = req.body;
    ROOM_LIST.push({ ...bodyData });
    res.status(200).json({ message: 'success', list: ROOM_LIST });
  }
}
