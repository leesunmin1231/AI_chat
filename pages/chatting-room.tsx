import { KeyboardEvent, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import type { ChatResponse } from '@/types/ChatResponse';
import Input from '@/components/common/Input';
import { body } from '@/styles/mixin';
import { httpPost } from '@/utils/http';

export default function ChattingRoom() {
  const [message, setMessage] = useState<ChatResponse[]>([]);
  const [send, setSend] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const requestOpenai = async () => {
    httpPost('/api/openai', { roomId: id, message: send }).then((response) => setMessage(response.roomData.chatList));
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
        {message.map((data) =>
          data.speaker === 'AI' ? <Chat isAI>{data.message}</Chat> : <Chat isAI={false}>{data.message}</Chat>
        )}
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
  float: ${({ isAI }) => (isAI ? 'left' : 'right')};
  width: fit-content;
  max-width: 200px;
  padding: 15px;
  border-radius: 20px;
`;
