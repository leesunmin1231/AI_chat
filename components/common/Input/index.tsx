import React, { ChangeEventHandler, ReactNode, MouseEventHandler, KeyboardEventHandler } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { body, subtitle } from '@/styles/mixin';

interface InputProps {
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  children?: ReactNode;
  icon?: string;
  onClick?: MouseEventHandler;
  onKeyDown?: KeyboardEventHandler;
}

export default function Input({ id, label, onChange, value, children, icon, onClick, onKeyDown }: InputProps) {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <InputBox>
        <Text
          type="text"
          name={id}
          style={{ width: icon ? '260px' : '300px' }}
          {...{ id, onChange, value, onKeyDown }}
        />
        {icon && (
          <IconButton type="button" {...{ onClick }}>
            <Image alt="icon" src={icon} width={25} height={25} />
          </IconButton>
        )}
      </InputBox>
      <div style={{ width: '300px', height: '20px', marginTop: '10px' }}>{children}</div>
    </Wrapper>
  );
}

function Validate({ children }: { children: ReactNode }) {
  return <ValidateMessage>{children}</ValidateMessage>;
}

Input.Validate = Validate;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  ${subtitle}
  height: 30px;
`;

const InputBox = styled.div`
  border: 1px solid ${({ theme }) => theme.color.gray400};
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.color.black};
  display: flex;
  align-items: center;
  &:focus-within {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.white};
  }
`;

const Text = styled.input`
  height: 50px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color.white};
  pointer-events: all;
  padding-left: 10px;
  ${subtitle}
  background-color: ${({ theme }) => theme.color.black};
  border: 0;
  outline: none;
`;

const ValidateMessage = styled.div`
  color: ${({ theme }) => theme.color.white};
  width: 300px;
  height: 20px;
  ${body}
`;

const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: 0;
  background-color: ${({ theme }) => theme.color.black};
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-right: 5px;
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.7);
    }
  }
  &:active {
    filter: brightness(0.5);
  }
`;
