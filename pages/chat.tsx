import { KeyboardEvent, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Input from '@/components/common/Input';
import { httpPost } from '@/utils/http';

export default function Chat() {
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
      <div>
        <div style={{ color: 'white' }}>{message}</div>
      </div>
      <Input
        id="chat"
        label=""
        onChange={({ target }) => setSend(target.value)}
        icon="/sendEmoji.svg"
        onClick={requestOpenai}
        onKeyDown={(e) => onKeyDownHandler(e)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
