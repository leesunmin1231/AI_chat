import { useState } from 'react';
import { useTheme } from '@emotion/react';
import RoomUpdateModal from '.';
import Room from '../Room';

export default {
  title: 'Components/RoomUpdateModal',
  component: RoomUpdateModal,
};

export function RoomUpdateModalComponent() {
  const [roomForm, setRoomForm] = useState({ id: '/', name: '방 예시', people: '3' });
  const [roomList, setRoomList] = useState([{ id: '/', name: '방 예시', people: '3' }]);
  const { color } = useTheme();
  const { black } = color;
  return (
    <div style={{ backgroundColor: black }}>
      {roomList.map((room) => (
        <Room {...{ setRoomForm, ...room }} />
      ))}
      <RoomUpdateModal {...{ roomForm, setRoomForm, setRoomList }} />
    </div>
  );
}
