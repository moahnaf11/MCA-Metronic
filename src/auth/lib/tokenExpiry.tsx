import { useEffect, useRef } from 'react';
import { useAuth } from '../auth-provider';

const useIdleLogout = (timeout = 10 * 60 * 1000) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    const resetTimer = () => {
      if (timer.current) {
        clearTimeout(timer.current); // ✅ no more TS error
      }
      timer.current = setTimeout(logout, timeout);
    };
    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
      if (timer.current) {
        clearTimeout(timer.current); // ✅ no TS error here either
      }
    };
  }, [logout, timeout]);
};

export default useIdleLogout;
