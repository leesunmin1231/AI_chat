import { useState } from 'react';
import { useTheme } from '@emotion/react';
import Modal from '.';
import Button from '../Button';

export default {
  title: 'Components/Modal',
  component: Modal,
};

export function Default() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const { color } = useTheme();
  const { white } = color;
  return (
    <>
      <Button size="large" onClick={toggleHandler}>
        open
      </Button>
      <Modal {...{ isOpen }} onClose={toggleHandler}>
        <p style={{ color: white }}>Content1</p>
        <p style={{ color: white }}>Content2</p>
        <p style={{ color: white }}>Content3</p>
        <Button size="small" onClick={toggleHandler}>
          close
        </Button>
      </Modal>
    </>
  );
}
