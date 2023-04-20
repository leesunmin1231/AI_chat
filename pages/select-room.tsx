import React, { useEffect, useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import styled from '@emotion/styled';
import Image from 'next/image';
import type { RoomType } from '@/types/RoomResponse';
import Button from '@/components/common/Button';
import Room from '@/components/SelectRoom/Room';
import RoomForm from '@/components/SelectRoom/RoomForm';
import RoomUpdateModal from '@/components/SelectRoom/RoomUpdateModal';
import { IconButton } from '@/styles/IconButton';
import { initRoomForm } from '@/utils/constants';
import { httpGet, httpPost } from '@/utils/http';

export default function SelectRoom() {
  const [roomList, setRoomList] = useState<Omit<RoomType, 'chatList'>[]>([]);
  const [roomForm, setRoomForm] = useState<Omit<RoomType, 'chatList'>>(initRoomForm);
  const [addNewRoom, setAddNewRoom] = useState(false);

  useEffect(() => {
    httpGet('/api/roomlist').then((data) => setRoomList(data.list));
  }, []);
  useEffect(() => {
    setRoomForm(initRoomForm);
  }, [roomList]);

  const postRoomHandler = () => {
    httpPost('/api/roomlist', roomForm).then((response) => {
      setRoomList(response.list);
      setAddNewRoom(false);
    });
  };
  return (
    <Wrapper>
      <Header>
        <Image src="/Title.svg" width={100} height={50} alt="title" />
        <IconButton onClick={() => setAddNewRoom(!addNewRoom)}>
          {addNewRoom ? <HiOutlineMinus /> : <HiOutlinePlus />}
        </IconButton>
      </Header>
      {addNewRoom ? (
        <Section>
          <RoomForm {...{ setRoomForm, roomForm }} />
          <Button size="large" onClick={postRoomHandler}>
            방 생성
          </Button>
        </Section>
      ) : (
        <Section>
          {roomList.map((room) => (
            <Room key={room.id} {...{ ...room, setRoomForm }} />
          ))}
          <RoomUpdateModal {...{ setRoomForm, setRoomList, roomForm }} />
        </Section>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
`;

const Section = styled.section`
  width: 100%;
  flex: 1;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
