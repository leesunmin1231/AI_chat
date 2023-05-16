import React, { useState } from 'react';
import { httpPost } from '@/utils/http';

export default function Test2() {
  const [ip, setIP] = useState('');
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          httpPost('https://echo.seok.app/', {}).then((result) => setIP(result.ip));
        }}
      >
        request
      </button>
      <div style={{ color: 'white' }}>{ip}</div>
    </div>
  );
}
