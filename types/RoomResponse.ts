import { ChatResponse } from './ChatResponse';

export type RoomType = {
  id: string;
  name: string;
  people: string;
  chatList: ChatResponse[];
};
