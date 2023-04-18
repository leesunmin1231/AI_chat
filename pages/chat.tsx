import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Button from '@/components/common/Button';
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
  return (
    <Wrapper>
      <div>
        <div style={{ color: 'white' }}>{message}</div>
      </div>
      <Input id="chat" label="" onChange={({ target }) => setSend(target.value)} />
      <Button size="small" onClick={requestOpenai}>
        전송
      </Button>
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
