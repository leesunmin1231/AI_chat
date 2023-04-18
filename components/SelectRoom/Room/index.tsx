import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import type { RoomType } from '@/types/RoomResponse';
import Button from '@/components/common/Button';
import { subtitle } from '@/styles/mixin';

interface RoomProps {
  id: string;
  name: string;
  people: string;
  setRoomForm: Dispatch<SetStateAction<RoomType>>;
}
export default function Room({ id, name, people, setRoomForm }: RoomProps) {
  return (
    <Wrapper>
      <Info>{`${name}: ${people}명`}</Info>
      <Button size="small" onClick={() => setRoomForm({ id, name, people })}>
        수정
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
  padding: 0 30px;
`;
const Info = styled.div`
  ${subtitle}
  line-height: 60px;
`;
