import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/common/Button';
import { subtitle } from '@/styles/mixin';

interface RoomProps {
  name: string;
  people: number;
  setModalInitInputValue: Dispatch<SetStateAction<string>>;
}
export default function Room({ name, people, setModalInitInputValue }: RoomProps) {
  return (
    <Wrapper>
      <Info>{`${name}: ${people}명`}</Info>
      <Button size="small" onClick={() => setModalInitInputValue(name)}>
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
