import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import styled from '@emotion/styled';
import Image from 'next/image';

export default function Header() {
  return (
    <Wrapper>
      <Image src="/Title.svg" width={100} height={50} alt="title" />
      <AddButton>
        <HiOutlinePlus />
      </AddButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
