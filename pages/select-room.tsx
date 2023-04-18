import React, { useEffect, useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import styled from '@emotion/styled';
import Image from 'next/image';
import RoomForm from '@/components/RoomForm';
import { httpGet, httpPost } from '@/utils/http';

type Room = {
  name: string;
  people: number;
};
export default function SelectRoom() {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [addNewRoom, setAddNewRoom] = useState(false);
  useEffect(() => {
    httpGet('/api/roomlist').then((data) => setRoomList(data.list));
  });
  const addRoomHandler = () => {
    setAddNewRoom(!addNewRoom);
  };
  return (
    <Wrapper>
      <Header>
        <Image src="/Title.svg" width={100} height={50} alt="title" />
        <AddButton onClick={addRoomHandler}>{addNewRoom ? <HiOutlineMinus /> : <HiOutlinePlus />}</AddButton>
      </Header>
      {addNewRoom ? (
        <RoomForm />
      ) : (
        roomList.map((room) => (
          <li>
            <span>{room.name}</span>
            <span>{room.people}</span>
          </li>
        ))
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