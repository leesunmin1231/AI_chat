import React from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import MainLogo from '@/components/MainLogo';

export default function Login() {
  return (
    <div>
      <MainLogo />
      <Input />
      <Button size="large">Login</Button>
    </div>
  );
}
