import { useState } from 'react';
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
  return (
    <>
      <Button size="large" onClick={toggleHandler}>
        open
      </Button>
      <Modal {...{ isOpen }} onClose={toggleHandler}>
        <p>Content1</p>
        <p>Content2</p>
        <p>Content3</p>
        <Button size="small" onClick={toggleHandler}>
          close
        </Button>
      </Modal>
    </>
  );
}
