import { useState } from 'react';
import { useTheme } from '@emotion/react';
import Room from '.';

export default {
  title: 'Components/Room',
  component: Room,
};

export function DefaultRoom() {
  const [example, setFormState] = useState({ id: '/', name: '방 예시', people: '3' });
  const { id, name, people } = example;
  const { color } = useTheme();
  const { black } = color;
  return (
    <div style={{ backgroundColor: black }}>
      <Room {...{ id, name, people }} setRoomForm={setFormState} />
    </div>
  );
}
