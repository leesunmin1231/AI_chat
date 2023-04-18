// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize, CookieSerializeOptions } from 'cookie';
import type { NextApiResponse } from 'next';

export const setCookie = (res: NextApiResponse, name: string, value: unknown, options: CookieSerializeOptions = {}) => {
  const stringValue = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  if (typeof options.maxAge === 'number') {
    res.setHeader(
      'Set-Cookie',
      serialize(name, stringValue, { ...options, expires: new Date(Date.now() + options.maxAge * 1000) })
    );
    return;
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};
