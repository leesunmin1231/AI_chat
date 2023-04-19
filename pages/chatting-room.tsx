import { KeyboardEvent, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Input from '@/components/common/Input';
import { body } from '@/styles/mixin';
import { httpPost } from '@/utils/http';

export default function ChattingRoom() {
  const [message, setMessage] = useState('');
  const [send, setSend] = useState('');
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const requestOpenai = async () => {
    httpPost('/api/openai', { message: send }).then((response) => setMessage(response.ai_response));
  };
  const onKeyDownHandler = (e: KeyboardEvent<Element>) => {
    const { key } = e;
    if (key === 'Enter') {
      requestOpenai();
    }
  };
  return (
    <Wrapper>
      <ChatContainer>
        <Chat isAI>{message}</Chat>
      </ChatContainer>
      <SendContainer>
        <Input
          id="chat"
          onChange={({ target }) => setSend(target.value)}
          icon="/sendEmoji.svg"
          onClick={requestOpenai}
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
      </SendContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
  width: 100%;
`;

const ChatContainer = styled.div`
  flex: 1;
`;

const SendContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chat = styled.div<{ isAI: boolean }>`
  ${body}
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme, isAI }) => (isAI ? theme.color.primary : theme.color.offwhite)};
  float: ${({ isAI }) => (isAI ? 'right' : 'left')};
  width: fit-content;
  max-width: 200px;
  padding: 15px;
  border-radius: 20px;
`;
