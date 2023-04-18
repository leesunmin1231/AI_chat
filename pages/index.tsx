import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Router from 'next/router';
import Button from '@/components/Button';
import Input from '@/components/Input';
import MainLogo from '@/components/MainLogo';
import Modal from '@/components/Modal';
import { httpPost } from '@/utils/http';

export default function Login() {
  const [modalCotent, setModalContent] = useState('');
  const apiKeyRef = useRef<HTMLInputElement | null>(null);
  const onClickHandler = () => {
    const apiKey = apiKeyRef.current ? apiKeyRef.current.value : '';
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
        <Input id="api-key" label="API KEY" ref={apiKeyRef} />
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
