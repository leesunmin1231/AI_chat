import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import RoomForm from '../RoomForm';
import type { RoomType } from '@/types/RoomResponse';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { initRoomForm } from '@/utils/constants';
import { httpPut, httpDelete } from '@/utils/http';

interface RoomUpdateModalProps {
  roomForm: Omit<RoomType, 'chatList'>;
  setRoomForm: Dispatch<SetStateAction<Omit<RoomType, 'chatList'>>>;
  setRoomList: Dispatch<SetStateAction<Omit<RoomType, 'chatList'>[]>>;
}

export default function RoomUpdateModal({ roomForm, setRoomForm, setRoomList }: RoomUpdateModalProps) {
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
  );
}
const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  button {
    margin-left: 20px;
  }
`;
