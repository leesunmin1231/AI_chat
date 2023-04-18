import React from 'react';

interface RoomProps {
  name: string;
  people: number;
}
export default function Room({ name, people }: RoomProps) {
  return (
    <li>
      <span>{name}</span>
      <span>{people}</span>
    </li>
  );
}
