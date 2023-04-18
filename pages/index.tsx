import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Router from 'next/router';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import MainLogo from '@/components/Login/MainLogo';
import { httpPost } from '@/utils/http';

export default function Login() {
  const [modalCotent, setModalContent] = useState('');
  const [apiKey, setApiKey] = useState('');
  const onClickHandler = () => {
    httpPost('/api/login', { apiKey })
      .then(() => {
        Router.push('/select-room');
      })
      .catch((e) => {
        setModalContent(String(e));
      });
  };
  return (
    <Wrapper>
      <MainLogo />
      <LoginForm>
        <Input id="api-key" label="API KEY" onChange={({ target }) => setApiKey(target.value)} />
        <Button size="large" onClick={onClickHandler}>
          Login
        </Button>
      </LoginForm>
      <Footer>
        <Link href="https://platform.openai.com/docs/api-reference/authentication" target="_blank">
          KEY 발급받는 방법
        </Link>
      </Footer>
      <Modal isOpen={!!modalCotent} onClose={() => setModalContent('')}>
        <Content>{modalCotent}</Content>
        <Button size="small" onClick={() => setModalContent('')}>
          close
        </Button>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.footer`
  height: 8%;
  padding-top: 4%;
  a {
    color: ${({ theme }) => theme.color.white};
    text-decoration: underline;
  }
`;

const Content = styled.div`
  min-height: 50px;
  padding-bottom: 30px;
`;
