import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
};

export function LargeButton() {
  return <Button size="large">Button</Button>;
}

export function SmallButton() {
  return <Button size="small">Button</Button>;
}
