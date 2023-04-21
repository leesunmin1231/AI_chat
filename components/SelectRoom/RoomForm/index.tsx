import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Input from '../../common/Input';
import { RoomType } from '@/types/RoomResponse';

interface RoomFormProps {
  roomForm: Omit<RoomType, 'chatList'>;
  setRoomForm: Dispatch<SetStateAction<Omit<RoomType, 'chatList'>>>;
}

export default function RoomForm({ roomForm, setRoomForm }: RoomFormProps) {
  return (
    <Wrapper>
      <Input
        id="room-name"
        label="방 이름"
        value={roomForm.name}
        onChange={({ target }) => setRoomForm((prev) => ({ ...prev, name: target.value }))}
      />
      <Input
        id="room-people"
        label="방 인원"
        value={String(roomForm.people)}
        onChange={({ target }) => {
          setRoomForm((prev) => ({
            ...prev,
            people: target.value,
          }));
        }}
      >
        {roomForm.people && !/^[0-9]+$/.test(roomForm.people) && (
          <Input.Validate>숫자만 입력 가능합니다.</Input.Validate>
        )}
      </Input>
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
`;
