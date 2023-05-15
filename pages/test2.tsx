import React, { useState } from 'react';
import { httpPost } from '@/utils/http';

export default function Test2() {
  const [ip, setIP] = useState('');
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          httpPost('http://34.64.113.180:3000/', {}).then((result) => setIP(result.ip));
        }}
      >
        request
      </button>
      <div style={{ color: 'white' }}>{ip}</div>
    </div>
  );
}
