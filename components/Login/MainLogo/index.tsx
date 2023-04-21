import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

export default function MainLogo() {
  return (
    <Header>
      <Image src="/Logo.svg" alt="Logo" width={80} height={80} priority />
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 46vh;
  padding-top: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
