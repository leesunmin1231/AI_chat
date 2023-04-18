// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ORGANIZATION_ID } from '@/db';
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
      organization: ORGANIZATION_ID,
      apiKey: bodyData.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    openai
      .listFiles()
      .then(() => {
        setCookie(res, 'Auth', ORGANIZATION_ID, { path: '/', maxAge: 2592000 });
        res.status(200).json({ message: 'success', org_id: ORGANIZATION_ID });
      })
      .catch((response) => {
        res.status(401).json({ message: response.message });
      });
  }
}
