import styled from '@emotion/styled';

export const IconButton = styled.button`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.black};
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.color.black};
      filter: brightness(0.7);
    }
  }
  &:active {
    filter: brightness(0.5);
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
