import { useState } from 'react';
import { useTheme } from '@emotion/react';
import RoomForm from '.';

export default {
  title: 'Components/RoomForm',
  component: RoomForm,
};

export function RoomFormComponent() {
  const [roomForm, setRoomForm] = useState({ id: '/', name: '방 예시', people: '3' });
  const { color } = useTheme();
  const { black } = color;
  return (
    <div style={{ backgroundColor: black }}>
      <RoomForm {...{ roomForm, setRoomForm }} />
    </div>
  );
}
