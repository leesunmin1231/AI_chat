import React, { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import Portal from '../Potal';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: MouseEventHandler;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <Portal id="modal-root">
      <Wrapper {...{ isOpen }}>
        <BackGround onClick={onClose} />
        <ModalBox>{children}</ModalBox>
      </Wrapper>
    </Portal>
  );
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  display: flex;
  opacity: 0.4;
  background-color: ${({ theme }) => theme.color.black};
`;

const Wrapper = styled.div<Pick<ModalProps, 'isOpen'>>`
  width: 100%;
  height: 100%;
  position: fixed;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  left: 0;
  top: 0;
`;
const ModalBox = styled.aside`
  width: min-content;
  height: min-content;
  position: relative;
  z-index: 2;
  padding: 30px 30px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
