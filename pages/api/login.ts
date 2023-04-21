// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { addUser } from '@/db/model';
import { setCookie } from '@/utils/cookies';

type Data = {
  message: string;
  org_id?: string;
};

type RequestBody = {
  apiKey: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const bodyData: RequestBody = req.body;
    const configuration = new Configuration({
      apiKey: bodyData.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    openai
      .listFiles()
      .then(() => {
        setCookie(res, 'Auth', bodyData.apiKey, { path: '/', maxAge: 2592000 });
        // addUser(bodyData.apiKey);
        res.status(200).json({ message: 'success' });
      })
      .catch((response) => {
        res.status(401).json({ message: response.message });
      });
  }
}
