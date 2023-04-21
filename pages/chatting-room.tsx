import { KeyboardEvent, useEffect, useState, useRef, RefObject } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import styled from '@emotion/styled';
import Router from 'next/router';
import type { ChatResponse } from '@/types/ChatResponse';
import Error from '@/components/common/Error';
import Input from '@/components/common/Input';
import { IconButton } from '@/styles/IconButton';
import { body, title } from '@/styles/mixin';
import { httpGet, httpPost } from '@/utils/http';

const ERROR_MESSAGE = '요청 횟수가 너무 많습니다.\n잠시 기다린 후에 대화를 보내보세요.';

export default function ChattingRoom({ id }: { id: string }) {
  const [message, setMessage] = useState<ChatResponse[]>([]);
  const [roomName, setRoomName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [clock, setClock] = useState<Date | null>(null);
  const [send, setSend] = useState('');
  const scrollRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const sendMessageHandler = () => {
    const newMessage = { id: String(Math.random()), speaker: 'user', message: send };
    setMessage(message.concat(newMessage));
    postChat(send);
    setSend('');
  };

  const AIConversation = async (aiMessage: ChatResponse[]) => {
    const current = new Date();
    if (isLoading || (clock && current.getTime() - clock.getTime() <= 30 * 1000)) return;
    const toSend = aiMessage.at(-1);
    if (toSend) {
      try {
        setClock(new Date());
        const res = await httpPost('/api/chat', {
          roomId: id,
          message: toSend.message,
          speaker: toSend.speaker,
          sendOpenAI: true,
        });
        setMessage(res.roomData.chatList);
      } catch {
        setErrorMessage(ERROR_MESSAGE);
      }
    }
  };

  const postChat = (toSend: string) => {
    const current = new Date();
    if (isLoading || (clock && current.getTime() - clock.getTime() <= 30 * 1000)) {
      httpPost('/api/chat', {
        roomId: id,
        message: toSend,
        speaker: 'user',
        sendOpenAI: false,
      })
        .then((response) => setMessage(response.roomData.chatList))
        .catch(() => setErrorMessage(ERROR_MESSAGE));
      return;
    }
    setIsLoading(true);
    setClock(new Date());
    httpPost('/api/chat', { roomId: id, message: toSend, speaker: 'user', sendOpenAI: true })
      .then((response) => {
        setMessage(response.roomData.chatList);
        const { newChatList } = response.roomData;
        AIConversation(newChatList);
      })
      .catch(() => setErrorMessage(ERROR_MESSAGE))
      .finally(() => setIsLoading(false));
  };

  const onKeyDownHandler = (e: KeyboardEvent<Element>) => {
    if (e.nativeEvent.isComposing) return;
    if (errorMessage) return;
    const { key } = e;
    if (key === 'Enter') {
      sendMessageHandler();
    }
  };

  useEffect(() => {
    httpGet(`/api/chat?id=${id}`)
      .then((response) => {
        setMessage(response.roomData.chatList);
        setRoomName(response.roomData.name);
      })
      .catch((e) => setErrorMessage(`${e}\n서버에 오류가 발생했습니다.`));
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [message]);
  return (
    <Wrapper>
      <Header>
        <IconButton onClick={() => Router.back()}>
          <MdArrowBackIosNew />
        </IconButton>
        <Title>{roomName}</Title>
      </Header>
      <ChatContainer ref={scrollRef}>
        {message.map((data) =>
          data.speaker.includes('AI') ? (
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
          value={send}
          icon="/sendEmoji.svg"
          onClick={sendMessageHandler}
          onKeyDown={(e) => onKeyDownHandler(e)}
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
const Header = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: left;
  padding: 10px 15px;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
`;
const Title = styled.div`
  ${title}
  line-height: 30px;
  margin-top: 5px;
  margin-left: 10px;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
`;

const SendContainer = styled.div`
  width: 100%;
  margin-top: 15px;
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
