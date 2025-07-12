import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setContainer(document.body);
  }, []);

  return mounted && container ? createPortal(children, container) : null;
}
