import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id: string;
  children: ReactNode;
}

export default function Portal({ id, children }: PortalProps) {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const portalRoot = document.getElementById(id);
    ref.current = portalRoot;
  }, []);

  if (ref.current && mounted) {
    return createPortal(children, ref.current);
  }
  return null;
}
