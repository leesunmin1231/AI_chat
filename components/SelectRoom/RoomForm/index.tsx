import React, { RefObject } from 'react';
import styled from '@emotion/styled';
import Input from '../../common/Input';

interface RoomFormProps {
  roomTotal: RefObject<HTMLInputElement>;
  roomName: RefObject<HTMLInputElement>;
}

export default function RoomForm({ roomTotal, roomName }: RoomFormProps) {
  return (
    <Wrapper>
      <Input id="room-name" label="방 이름" ref={roomName} />
      <Input id="room-people" label="방 인원" ref={roomTotal} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    margin: 15px 0;
  }
`;
