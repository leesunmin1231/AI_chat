import React, { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Modal from '../Modal';
import { subtitle } from '@/styles/mixin';

interface ErrorProps {
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export default function Error({ errorMessage, setErrorMessage }: ErrorProps) {
  return (
    <Modal isOpen={!!errorMessage} onClose={() => setErrorMessage('')}>
      <Content>{errorMessage}</Content>
      <Button size="small" onClick={() => setErrorMessage('')}>
        close
      </Button>
    </Modal>
  );
}

const Content = styled.div`
  min-height: 50px;
  width: 200px;
  padding-bottom: 30px;
  white-space: pre-wrap;
  line-height: 30px;
  ${subtitle}
`;
