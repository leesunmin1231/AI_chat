import React, { useEffect, useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import styled from '@emotion/styled';
import Image from 'next/image';
import type { RoomType } from '@/types/RoomResponse';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Room from '@/components/SelectRoom/Room';
import RoomForm from '@/components/SelectRoom/RoomForm';
import { httpDelete, httpGet, httpPost, httpPut } from '@/utils/http';

const initRoomForm = { id: '', name: '', people: '' };

export default function SelectRoom() {
  const [roomList, setRoomList] = useState<RoomType[]>([]);
  const [roomForm, setRoomForm] = useState<RoomType>(initRoomForm);
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
  const updateRoomHandler = () => {
    httpPut('/api/roomlist', roomForm).then((response) => {
      setRoomList(response.list);
    });
  };
  const deleteRoomHandler = () => {
    httpDelete(`/api/roomlist?id=${roomForm.id}`).then((response) => {
      setRoomList(response.list);
    });
  };
  return (
    <Wrapper>
      <Header>
        <Image src="/Title.svg" width={100} height={50} alt="title" />
        <AddButton onClick={() => setAddNewRoom(!addNewRoom)}>
          {addNewRoom ? <HiOutlineMinus /> : <HiOutlinePlus />}
        </AddButton>
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
          <Modal isOpen={!!roomForm.id} onClose={() => setRoomForm(initRoomForm)}>
            <RoomForm {...{ setRoomForm, roomForm }} />
            <Footer>
              <Button size="small" isDelete onClick={deleteRoomHandler}>
                삭제
              </Button>
              <Button size="small" onClick={updateRoomHandler}>
                수정
              </Button>
            </Footer>
          </Modal>
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
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  button {
    margin-left: 20px;
  }
`;
