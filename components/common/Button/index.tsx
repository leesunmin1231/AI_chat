import React, { ReactEventHandler, ReactNode } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { FONT } from '@/styles/font';

interface ButtonProps {
  size: 'small' | 'large';
  isDelete?: boolean | undefined;
  onClick?: ReactEventHandler;
  children: ReactNode;
}

export default function Button({ size, children, onClick, isDelete = false }: ButtonProps) {
  const font = size === 'small' ? FONT.body : FONT.title;
  const { color: themeColor } = useTheme();
  const { red, primary, black } = themeColor;
  return (
    <ButtonWrapper
      type="button"
      style={{
        fontSize: font.size,
        fontWeight: font.weight,
        color: black,
        backgroundColor: isDelete ? red : primary,
        width: size === 'small' ? '50px' : '300px',
        height: size === 'small' ? '30px' : '50px',
      }}
      {...{ onClick }}
    >
      {children}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
  white-space: nowrap;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.9);
    }
  }
  &:active {
    filter: brightness(0.7);
  }
`;
