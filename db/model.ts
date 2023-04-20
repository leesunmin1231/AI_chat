// import type { ChatResponse } from '@/types/ChatResponse';
import fs from 'fs';
import path from 'path';
import { ChatResponse } from '@/types/ChatResponse';
import { RoomType } from '@/types/RoomResponse';

type DataBase = {
  users: { apiKey: string; rooms: RoomType[] }[];
};
const __dirname = path.resolve();
const dbPath = path.join(__dirname, './db/db.json');

export const addUser = (apiKey: string) => {
  const file = fs.readFileSync(dbPath);
  const prevData: DataBase = JSON.parse(file.toString());
  const targetUser = prevData.users.filter((user) => user.apiKey === apiKey).at(0);
  if (targetUser === undefined) {
    prevData.users.push({ apiKey, rooms: [] });
    fs.writeFileSync(dbPath, JSON.stringify(prevData));
  }
};

export const getUserRooms = (apiKey: string) => {
  const file = fs.readFileSync(dbPath);
  const prevData: DataBase = JSON.parse(file.toString());
  const userData = prevData.users.filter((user) => user.apiKey === apiKey);
  if (userData.length === 0) return [];
  return userData[0].rooms;
};

export const addRoom = (apiKey: string, newRoom: RoomType) => {
  const file = fs.readFileSync(dbPath);
  const prevData: DataBase = JSON.parse(file.toString());
  const userData = prevData.users.filter((user) => user.apiKey === apiKey);
  if (userData.length === 0) return [];
  userData[0].rooms.push(newRoom);
  const updateData = prevData.users.map((user) => (user.apiKey === apiKey ? userData[0] : user));
  fs.writeFileSync(dbPath, JSON.stringify({ users: updateData }));
  return userData[0].rooms;
};

export const updateRoom = (apiKey: string, newRoom: RoomType) => {
  const file = fs.readFileSync(dbPath);
  const prevData: DataBase = JSON.parse(file.toString());
  const userData = prevData.users.filter((user) => user.apiKey === apiKey);
  if (userData.length === 0) return [];
  const updateData = prevData.users.map((user) =>
    user.apiKey === apiKey
      ? { ...user, rooms: user.rooms.map((room) => (room.id === newRoom.id ? newRoom : room)) }
      : user
  );
  fs.writeFileSync(dbPath, JSON.stringify({ users: updateData }));
  return userData[0].rooms;
};

export const deleteRoom = (apiKey: string, roomId: string) => {
  const file = fs.readFileSync(dbPath);
  const prevData: DataBase = JSON.parse(file.toString());
  const userData = prevData.users.filter((user) => user.apiKey === apiKey);
  if (userData.length === 0) return [];
  const updateData = prevData.users.map((user) =>
    user.apiKey === apiKey ? { ...user, rooms: user.rooms.filter((room) => room.id !== roomId) } : user
  );
  fs.writeFileSync(dbPath, JSON.stringify({ users: updateData }));
  return userData[0].rooms;
};

export const addChat = (apiKey: string, roomId: string, newChat: ChatResponse) => {
  const file = fs.readFileSync(dbPath);
  const prevData: DataBase = JSON.parse(file.toString());
  const userData = prevData.users.filter((user) => user.apiKey === apiKey);
  if (userData.length === 0) return undefined;
  const roomData = userData[0].rooms.map((room) =>
    room.id === roomId ? { ...room, chatList: room.chatList.concat(newChat) } : room
  );
  const updateData = prevData.users.map((user) => (user.apiKey === apiKey ? { ...user, rooms: roomData } : user));
  fs.writeFileSync(dbPath, JSON.stringify({ users: updateData }));
  return roomData.filter((room) => room.id === roomId).at(0);
};

export const getRoomData = (apiKey: string, roomId: string) => {
  const file = fs.readFileSync(dbPath);
  const prevData: DataBase = JSON.parse(file.toString());
  const userData = prevData.users.filter((user) => user.apiKey === apiKey);
  if (userData.length === 0) return undefined;
  const roomData = userData[0].rooms.filter((room) => room.id === roomId);
  if (roomData.length === 0) return undefined;
  return roomData[0];
};
