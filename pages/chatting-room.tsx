import { KeyboardEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import type { ChatResponse } from '@/types/ChatResponse';
import Error from '@/components/common/Error';
import Input from '@/components/common/Input';
import { body } from '@/styles/mixin';
import { httpGet, httpPost } from '@/utils/http';

export default function ChattingRoom({ id }: { id: string }) {
  const [message, setMessage] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [send, setSend] = useState('');
  const postChat = async () => {
    if (isLoading) return;
    setIsLoading(true);
    httpPost('/api/chat', { roomId: id, message: send })
      .then((response) => setMessage(response.roomData.chatList))
      .catch(() => setErrorMessage('요청 횟수가 너무 많습니다.\n잠시 기다린 후에 대화를 보내보세요.'))
      .finally(() => setIsLoading(false));
  };
  const onKeyDownHandler = (e: KeyboardEvent<Element>) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      postChat();
    }
  };
  useEffect(() => {
    httpGet(`/api/chat?id=${id}`)
      .then((response) => setMessage(response.roomData.chatList))
      .catch((e) => setErrorMessage(`${e}\n서버에 오류가 발생했습니다.`));
  }, []);
  return (
    <Wrapper>
      <ChatContainer>
        {message.map((data) =>
          data.speaker === 'AI' ? (
            <Row key={data.id}>
              <Chat isAI>{data.message}</Chat>
            </Row>
          ) : (
            <Row key={data.id}>
              <Chat isAI={false}>{data.message}</Chat>
            </Row>
          )
        )}
      </ChatContainer>
      <SendContainer>
        <Input
          id="chat"
          onChange={({ target }) => setSend(target.value)}
          icon="/sendEmoji.svg"
          onClick={postChat}
          onKeyDown={(e) => onKeyDownHandler(e)}
          disabled={isLoading}
          autoFocus
        />
      </SendContainer>
      <Error {...{ errorMessage, setErrorMessage }} />
    </Wrapper>
  );
}

export async function getServerSideProps({ query: { id } }: { query: { id: string } }) {
  return {
    props: {
      id,
    },
  };
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
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const SendContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  width: 100%;
  padding: 5px 10px;
`;

const Chat = styled.div<{ isAI: boolean }>`
  ${body}
  color: ${({ theme }) => theme.color.black};
  background-color: ${({ theme, isAI }) => (isAI ? theme.color.primary : theme.color.offwhite)};
  float: ${({ isAI }) => (isAI ? 'left' : 'right')};
  width: fit-content;
  max-width: 250px;
  padding: 15px;
  border-radius: 20px;
`;
