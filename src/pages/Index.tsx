import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '@/components/CodeEditor';
import OutputPanel from '@/components/OutputPanel';
import Header from '@/components/Header';
import { compileCode, DEFAULT_HTML, DEFAULT_CSS, DEFAULT_JS } from '@/utils/compiler';
import { toast } from '@/components/ui/use-toast';
import { downloadCodeAsZip } from '@/utils/downloadUtils';

const Index = () => {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [compiledCode, setCompiledCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial compilation
  useEffect(() => {
    const initialCode = compileCode({ html, css, js });
    setCompiledCode(initialCode);
  }, []);

  const handleRun = () => {
    setIsLoading(true);
    
    // Simulate a small delay for visual feedback
    setTimeout(() => {
      try {
        const code = compileCode({ html, css, js });
        setCompiledCode(code);
        toast({
          title: "Code executed successfully",
          description: "Your code has been compiled and is running in the output panel.",
          duration: 3000,
        });
      } catch (error) {
        console.error('Compilation error:', error);
        toast({
          title: "Compilation error",
          description: error instanceof Error ? error.message : "Unknown error occurred",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  const handleClear = () => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setJs(DEFAULT_JS);
    
    // Recompile with default code
    const code = compileCode({ 
      html: DEFAULT_HTML, 
      css: DEFAULT_CSS, 
      js: DEFAULT_JS 
    });
    setCompiledCode(code);
    
    toast({
      title: "Editor cleared",
      description: "All code has been reset to default examples.",
      duration: 3000,
    });
  };

  const handleDownload = () => {
    downloadCodeAsZip(html, css, js);
    toast({
      title: "Download started",
      description: "Your code is being downloaded as a zip file.",
      duration: 3000,
    });
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col theme-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header onRun={handleRun} onClear={handleClear} isLoading={isLoading} />
      
      <motion.div 
        className="flex-1 flex flex-col lg:flex-row gap-4 px-4 sm:px-6 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[calc(100vh-120px)]">
          <CodeEditor
            html={html}
            css={css}
            js={js}
            onHtmlChange={setHtml}
            onCssChange={setCss}
            onJsChange={setJs}
          />
        </div>
        
        <div className="w-full lg:w-1/2 h-[400px] lg:h-[calc(100vh-120px)]">
          <OutputPanel 
            compiledCode={compiledCode} 
            onDownload={handleDownload}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
