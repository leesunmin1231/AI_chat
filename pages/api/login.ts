// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

type RequestBody = {
  apiKey: string;
};

const ORGANIZATION_ID = 'org-dae9G7eyl7ExC8zTgBM9obqR';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const bodyData: RequestBody = req.body;
  const configuration = new Configuration({
    organization: ORGANIZATION_ID,
    apiKey: bodyData.apiKey,
  });
  const openai = new OpenAIApi(configuration);
  openai
    .listFiles()
    .then(() => {
      res.status(200).json({ message: 'success' });
    })
    .catch((response) => {
      res.status(401).json({ message: response.message });
    });
}
