import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  ai_response?: string;
};

type RequestBody = {
  org_id: string;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const bodyData: RequestBody = req.body;
    const { cookie } = req.headers;
    const orgId = cookie ? cookie.split('=').at(1) : '';
    const configuration = new Configuration({ organization: orgId, apiKey: process.env.NEXT_PUBLIC_API_KEY });
    const openai = new OpenAIApi(configuration);
    openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: bodyData.message }],
      })
      .then((completion) => {
        const response = completion.data.choices[0].message ? completion.data.choices[0].message.content : '';
        res.status(200).json({ message: 'success', ai_response: response });
      })
      .catch((response) => {
        res.status(401).json({ message: response.message });
      });
  }
}
