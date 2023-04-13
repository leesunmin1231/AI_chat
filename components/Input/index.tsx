import React, { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { subtitle } from '@/styles/mixin';

interface InputProps {
  id: string;
  label: string;
}

const Input = forwardRef(({ id, label }: InputProps, ref: Ref<HTMLInputElement>) => (
  <Wrapper>
    <Label htmlFor={id}>{label}</Label>
    <InputBox type="text" name={id} {...{ id, ref }} />
  </Wrapper>
));

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
  ${subtitle}
  background-color: ${({ theme }) => theme.color.black};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.white};
  }
`;

export default Input;
