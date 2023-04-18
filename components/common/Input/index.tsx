import React, { ChangeEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { body, subtitle } from '@/styles/mixin';

interface InputProps {
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  children?: ReactNode;
}

export default function Input({ id, label, onChange, value, children }: InputProps) {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <InputBox type="text" name={id} {...{ id, onChange, value }} />
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

const InputBox = styled.input`
  border: 1px solid ${({ theme }) => theme.color.gray400};
  border-radius: 5px;
  width: 300px;
  height: 50px;
  color: ${({ theme }) => theme.color.white};
  padding-left: 10px;
  ${subtitle}
  background-color: ${({ theme }) => theme.color.black};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.white};
  }
`;

const ValidateMessage = styled.div`
  color: ${({ theme }) => theme.color.white};
  width: 300px;
  height: 20px;
  ${body}
`;
