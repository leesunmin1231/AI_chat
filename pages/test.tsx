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
  const userData = await httpPost(`https://echo.seok.app/`, {});
  return {
    props: {
      userData,
    },
  };
}
