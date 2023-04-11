import { useState } from 'react';
import styled from '@emotion/styled';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: 'org-dae9G7eyl7ExC8zTgBM9obqR',
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default function Home() {
  const [message, setMessage] = useState({ role: '', content: '' });
  const requestOpenai = async () => {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: '노래 추천해줘' }],
    });
    const response = completion.data.choices[0].message
      ? completion.data.choices[0].message
      : { role: '', content: '' };
    setMessage(response);
  };
  return (
    <Wrapper>
      <button type="button" onClick={requestOpenai}>
        request chat
      </button>
      <div>
        <div>{message.role}</div>
        <div>{message.content}</div>
      </div>
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
