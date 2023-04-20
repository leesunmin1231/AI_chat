import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addRoom, deleteRoom, getUserRooms, updateRoom } from '@/db/model';
import { RoomType } from '@/types/RoomResponse';

type Data = {
  message: string;
  list?: RoomType[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { cookie } = req.headers;
    const apiKey = cookie ? cookie.split('=').at(1) : '';
    if (apiKey === undefined) {
      res.status(400).json({ message: 'unAutorized' });
      return;
    }
    res.status(200).json({ message: 'success', list: getUserRooms(apiKey) });
  }
  if (req.method === 'POST') {
    const bodyData: Omit<RoomType, 'id'> = req.body;
    const { cookie } = req.headers;
    const apiKey = cookie ? cookie.split('=').at(1) : '';
    if (apiKey === undefined) {
      res.status(400).json({ message: 'unAutorized' });
      return;
    }
    res.status(200).json({ message: 'success', list: addRoom(apiKey, { ...bodyData, id: nanoid(), chatList: [] }) });
  }
  if (req.method === 'PUT') {
    const bodyData: RoomType = req.body;
    const { cookie } = req.headers;
    const apiKey = cookie ? cookie.split('=').at(1) : '';
    if (apiKey === undefined) {
      res.status(400).json({ message: 'unAutorized' });
      return;
    }
    res.status(200).json({ message: 'success', list: updateRoom(apiKey, { ...bodyData, chatList: [] }) });
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const { cookie } = req.headers;
    const apiKey = cookie ? cookie.split('=').at(1) : '';
    if (apiKey === undefined) {
      res.status(400).json({ message: 'unAutorized' });
      return;
    }
    res.status(200).json({ message: 'success', list: deleteRoom(apiKey, (id as string) || '') });
  }
}
