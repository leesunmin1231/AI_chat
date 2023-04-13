import { useTheme } from '@emotion/react';
import Input from '.';

export default {
  title: 'Components/Input',
  component: Input,
};

export function Default() {
  const { color: themeColor } = useTheme();
  const { black } = themeColor;
  return (
    <div style={{ backgroundColor: black, padding: 40 }}>
      <Input id="default" label="INPUT" />
    </div>
  );
}
