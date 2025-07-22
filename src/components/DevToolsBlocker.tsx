
'use client';

import { useEffect } from 'react';

export default function DevToolsBlocker() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if (
          e.key === 'F12' ||
          e.keyCode === 123 ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
          (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
          (e.ctrlKey && e.key === 'U') ||
          (e.ctrlKey && e.keyCode === 85)
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      
      const devtools = /./;
      devtools.toString = function() {
        // This will be called when devtools are opened
        // You could add a redirect or a message here if you want
        window.location.href = '/'; 
        return '';
      };
      
      const checkDevTools = () => {
        console.log(devtools);
      };

      const interval = setInterval(checkDevTools, 1000);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        clearInterval(interval);
      };
    }
  }, []);

  return null;
}
