import { useState } from 'react';
import Error from '.';

export default {
  title: 'Components/Error',
  component: Error,
};

export function DefaultErrorModal() {
  const [errorMessage, setErrorMessage] = useState('오류 발생 모달');
  return <Error {...{ errorMessage, setErrorMessage }}>Error</Error>;
}
