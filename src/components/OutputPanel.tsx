
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OutputPanelProps {
  compiledCode: string;
}

const OutputPanel = ({ compiledCode }: OutputPanelProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(compiledCode);
        iframeDoc.close();
        
        // Forward console logs from iframe to parent window
        if (iframe.contentWindow) {
          // Type assertion to access console on Window
          const contentWindow = iframe.contentWindow as Window & typeof globalThis;
          const originalConsole = contentWindow.console;
          
          // Define new console with typesafe methods
          contentWindow.console = {
            ...originalConsole,
            log: (...args: any[]) => {
              originalConsole.log(...args);
              console.log('Output:', ...args);
            },
            error: (...args: any[]) => {
              originalConsole.error(...args);
              console.error('Output Error:', ...args);
            },
            warn: (...args: any[]) => {
              originalConsole.warn(...args);
              console.warn('Output Warning:', ...args);
            },
            info: (...args: any[]) => {
              originalConsole.info(...args);
              console.info('Output Info:', ...args);
            }
          };
        }
      }
    }
  }, [compiledCode]);
  
  return (
    <motion.div 
      className="w-full h-full bg-white dark:bg-gray-900 rounded-lg border border-editor-border shadow-sm overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="w-full h-8 bg-editor-tab-inactive dark:bg-editor-tab-inactive border-b border-editor-border flex items-center px-4">
        <span className="text-sm font-medium text-editor-foreground opacity-80">Output</span>
      </div>
      <div className="w-full h-[calc(100%-32px)]">
        <iframe
          ref={iframeRef}
          title="Code Output"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-popups allow-modals allow-same-origin"
        />
      </div>
    </motion.div>
  );
};

export default OutputPanel;
