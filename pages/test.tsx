import React from 'react';
import { httpPost } from '@/utils/http';

export default function Test({ userData }: { userData: { ip: string } }) {
  return (
    <div>
      <div style={{ color: 'white' }} key={userData.ip}>
        {userData.ip}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const userData = await httpPost(`http://34.64.113.180:3000/`, {});
  return {
    props: {
      userData,
    },
  };
}
