import React from 'react';
import styled from '@emotion/styled';
import { subtitle } from '@/styles/mixin';

interface InputProps {
  id: string;
  label: string;
}

export default function Input({ id, label }: InputProps) {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <InputBox type="text" name={id} id={id} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  ${subtitle}
  height: 30px;
`;

const InputBox = styled.input`
  border: 1px solid ${({ theme }) => theme.color.gray400};
  border-radius: 5px;
  width: 250px;
  height: 40px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.black};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.white};
  }
`;
