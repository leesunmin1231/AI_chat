import React from 'react';
import styled from '@emotion/styled';
import Input from '../Input';

export default function RoomForm() {
  return (
    <Wrapper>
      <Input id="room-name" label="방 이름" />
      <Input id="room-people" label="방 인원" />
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
