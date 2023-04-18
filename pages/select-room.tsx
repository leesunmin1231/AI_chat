import React, { useEffect, useState, useRef } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import styled from '@emotion/styled';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Room from '@/components/SelectRoom/Room';
import RoomForm from '@/components/SelectRoom/RoomForm';
import { httpGet, httpPost } from '@/utils/http';

type RoomType = {
  name: string;
  people: number;
};

export default function SelectRoom() {
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  const [addNewRoom, setAddNewRoom] = useState(false);
  const roomName = useRef<HTMLInputElement | null>(null);
  const roomTotal = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    httpGet('/api/roomlist').then((data) => setRoomList(data.list));
  }, []);
  const addRoomHandler = () => {
    setAddNewRoom(!addNewRoom);
  };
  const postRoomHandler = () => {
    if (!roomName.current || !roomTotal.current) return;
    const newRoom = { name: roomName.current.value, people: Number(roomTotal.current.value) };
    httpPost('/api/roomlist', newRoom);
    setRoomList([...roomList, newRoom]);
    setAddNewRoom(false);
  };
  return (
    <Wrapper>
      <Header>
        <Image src="/Title.svg" width={100} height={50} alt="title" />
        <AddButton onClick={addRoomHandler}>{addNewRoom ? <HiOutlineMinus /> : <HiOutlinePlus />}</AddButton>
      </Header>
      {addNewRoom ? (
        <Section>
          <RoomForm {...{ roomName, roomTotal }} />
          <Button size="large" onClick={postRoomHandler}>
            방 생성
          </Button>
        </Section>
      ) : (
        <Section>
          {roomList.map((room) => (
            <Room {...{ ...room }} />
          ))}
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
`;

const Section = styled.section`
  width: 100%;
  flex: 1;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddButton = styled.button`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.black};
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.color.black};
      filter: brightness(0.7);
    }
  }
  &:active {
    filter: brightness(0.5);
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
