import { nanoid } from 'nanoid';
import { RoomType } from '@/types/RoomResponse';

export const ROOMS = {
  _lists: [{ id: nanoid(), name: '방 1', people: '1' }],
  get get(): RoomType[] {
    return this._lists;
  },

  set set(value: RoomType[]) {
    this._lists = value;
  },
};
