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
  speaker: string;
  message: string;
  sendOpenAI: boolean;
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
    const prevRoomData =
      bodyData.speaker === 'user'
        ? addChat(apiKey, bodyData.roomId, [{ id: nanoid(), speaker: bodyData.speaker, message: bodyData.message }])
        : getRoomData(apiKey, bodyData.roomId);
    if (prevRoomData === undefined) {
      res.status(500).json({ message: 'Server Error' });
      return;
    }
    if (!bodyData.sendOpenAI) {
      res.status(200).json({ message: 'success', roomData: prevRoomData });
      return;
    }
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: bodyData.message },
          {
            role: 'system',
            content: `${
              Number(prevRoomData.people) - 1
            }명의 챗봇과 1명의 user가 대화하는 상황이야. 너는 챗봇이야. user의 content에 대한 대답을 하거나 이전 chat completion choice content에 대한 대답을 하면 돼.`,
          },
        ],
        n: bodyData.speaker === 'user' ? Number(prevRoomData.people) - 1 : Number(prevRoomData.people) - 2,
        presence_penalty: 1.0,
        frequency_penalty: 1.0,
      });
      const room = addChat(
        apiKey,
        bodyData.roomId,
        completion.data.choices.map((choice, index) => ({
          id: nanoid(),
          speaker: `AI ${index + 1}`,
          message: choice.message ? choice.message.content : '',
        }))
      );
      res.status(200).json({ message: 'success', roomData: room });
    } catch (e: any) {
      const room = addChat(apiKey, bodyData.roomId, [
        { id: nanoid(), speaker: `AI system`, message: '요청 횟수가 너무 많습니다. 잠시 기다린 후에 입력해주세요.' },
      ]);
      res.status(200).json({ message: 'success', roomData: room });
    }
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
