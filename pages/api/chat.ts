import { nanoid } from 'nanoid';
import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addChat, getRoomData } from '@/db/model';
import { RoomType } from '@/types/RoomResponse';

type Data = {
  message: string;
  roomData?: RoomType;
};

type RequestBody = {
  roomId: string;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const bodyData: RequestBody = req.body;
    const { cookie } = req.headers;
    const apiKey = cookie ? cookie.split('=').at(1) : '';
    if (apiKey === undefined) {
      res.status(400).json({ message: 'unAutorized' });
      return;
    }
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    addChat(apiKey, bodyData.roomId, { id: nanoid(), speaker: 'user', message: bodyData.message });
    openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: bodyData.message }],
      })
      .then((completion) => {
        const response = completion.data.choices[0].message ? completion.data.choices[0].message.content : '';
        const room = addChat(apiKey, bodyData.roomId, { id: nanoid(), speaker: 'AI', message: response });
        res.status(200).json({ message: 'success', roomData: room });
      })
      .catch((response) => {
        res.status(401).json({ message: response.message });
      });
  }
  if (req.method === 'GET') {
    const { cookie } = req.headers;
    const { id } = req.query;
    const apiKey = cookie ? cookie.split('=').at(1) : '';
    if (apiKey === undefined) {
      res.status(400).json({ message: 'unAutorized' });
      return;
    }
    const room = getRoomData(apiKey, (id as string) || '');
    res.status(200).json({ message: 'success', roomData: room });
  }
}
