import React from 'react';
import styled from '@emotion/styled';

export default function Loading({ size }: { size: number }) {
  return (
    <Spinner {...{ size }}>
      <Ldio {...{ size }}>
        <div />
      </Ldio>
    </Spinner>
  );
}

const Spinner = styled.div<{ size: number }>`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;
  overflow: hidden;
  background: ${({ theme }) => theme.color.primary};
`;

const Ldio = styled.div<{ size: number }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.98);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
  @keyframes ldio-d5xbm7usfl {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
  div {
    position: absolute;
    width: ${({ size }) => size / 2}px;
    height: ${({ size }) => size / 2}px;
    border: 3px solid ${({ theme }) => theme.color.offwhite};
    border-top-color: transparent;
    border-radius: 50%;
    animation: ldio-d5xbm7usfl 1s linear infinite;
    top: ${({ size }) => size / 2}px;
    left: ${({ size }) => size / 2}px;
  }
`;
