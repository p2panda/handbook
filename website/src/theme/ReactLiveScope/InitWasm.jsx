import { useEffect, useState } from 'react';
import { initWebAssembly } from 'shirokuma';

export const InitWasm = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initWebAssembly();
      setReady(true);
    };

    init();
  }, []);

  return ready ? children : null;
};
