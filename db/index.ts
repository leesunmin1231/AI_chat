import { nanoid } from 'nanoid';
import { RoomType } from '@/types/RoomResponse';

export const ORGANIZATION_ID = 'org-dae9G7eyl7ExC8zTgBM9obqR';
export const ROOMS = {
  _lists: [{ id: nanoid(), name: '방 1', people: '1' }],
  get get(): RoomType[] {
    return this._lists;
  },

  set set(value: RoomType[]) {
    this._lists = value;
  },
};

export const USER_DATA: { organization: string; apiKey: string }[] = [];
