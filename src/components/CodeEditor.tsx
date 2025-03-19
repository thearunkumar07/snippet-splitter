
import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { DEFAULT_HTML, DEFAULT_CSS, DEFAULT_JS } from '@/utils/compiler';

interface CodeEditorProps {
  html: string;
  css: string;
  js: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onJsChange: (value: string) => void;
}

const CodeEditor = ({ 
  html, 
  css, 
  js, 
  onHtmlChange, 
  onCssChange, 
  onJsChange 
}: CodeEditorProps) => {
  const [activeTab, setActiveTab] = useState('html');
  const [htmlEditor, setHtmlEditor] = useState<any>(null);
  const [cssEditor, setCssEditor] = useState<any>(null);
  const [jsEditor, setJsEditor] = useState<any>(null);
  const htmlContainer = useRef<HTMLDivElement>(null);
  const cssContainer = useRef<HTMLDivElement>(null);
  const jsContainer = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Load Monaco Editor asynchronously
  useEffect(() => {
    let monaco: any = null;
    
    const loadMonaco = async () => {
      const monaco = await import('monaco-editor');
      
      // Set editor theme based on current theme
      monaco.editor.defineTheme('lightTheme', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {}
      });
      
      monaco.editor.defineTheme('darkTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {}
      });
      
      // Create HTML editor if container exists
      if (htmlContainer.current && !htmlEditor) {
        const editor = monaco.editor.create(htmlContainer.current, {
          value: html || DEFAULT_HTML,
          language: 'html',
          theme: theme === 'dark' ? 'darkTheme' : 'lightTheme',
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true,
          tabSize: 2,
          renderLineHighlight: 'line',
          padding: { top: 10, bottom: 10 },
        });
        
        editor.onDidChangeModelContent(() => {
          onHtmlChange(editor.getValue());
        });
        
        setHtmlEditor(editor);
      }
      
      // Create CSS editor if container exists
      if (cssContainer.current && !cssEditor) {
        const editor = monaco.editor.create(cssContainer.current, {
          value: css || DEFAULT_CSS,
          language: 'css',
          theme: theme === 'dark' ? 'darkTheme' : 'lightTheme',
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true,
          tabSize: 2,
          renderLineHighlight: 'line',
          padding: { top: 10, bottom: 10 },
        });
        
        editor.onDidChangeModelContent(() => {
          onCssChange(editor.getValue());
        });
        
        setCssEditor(editor);
      }
      
      // Create JS editor if container exists
      if (jsContainer.current && !jsEditor) {
        const editor = monaco.editor.create(jsContainer.current, {
          value: js || DEFAULT_JS,
          language: 'javascript',
          theme: theme === 'dark' ? 'darkTheme' : 'lightTheme',
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          fontSize: 14,
          automaticLayout: true,
          tabSize: 2,
          renderLineHighlight: 'line',
          padding: { top: 10, bottom: 10 },
        });
        
        editor.onDidChangeModelContent(() => {
          onJsChange(editor.getValue());
        });
        
        setJsEditor(editor);
      }
    };
    
    loadMonaco();
    
    // Cleanup function
    return () => {
      if (htmlEditor) htmlEditor.dispose();
      if (cssEditor) cssEditor.dispose();
      if (jsEditor) jsEditor.dispose();
    };
  }, []);
  
  // Update editor theme when app theme changes
  useEffect(() => {
    if (htmlEditor) {
      htmlEditor.updateOptions({ theme: theme === 'dark' ? 'darkTheme' : 'lightTheme' });
    }
    if (cssEditor) {
      cssEditor.updateOptions({ theme: theme === 'dark' ? 'darkTheme' : 'lightTheme' });
    }
    if (jsEditor) {
      jsEditor.updateOptions({ theme: theme === 'dark' ? 'darkTheme' : 'lightTheme' });
    }
  }, [theme, htmlEditor, cssEditor, jsEditor]);
  
  return (
    <motion.div 
      className="editor-container w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
        <TabsList className="w-full bg-editor-tab-inactive border-b border-editor-border">
          <TabsTrigger 
            value="html" 
            className="data-[state=active]:bg-editor-tab-active flex-1 transition-all duration-300"
          >
            HTML
          </TabsTrigger>
          <TabsTrigger 
            value="css" 
            className="data-[state=active]:bg-editor-tab-active flex-1 transition-all duration-300"
          >
            CSS
          </TabsTrigger>
          <TabsTrigger 
            value="js" 
            className="data-[state=active]:bg-editor-tab-active flex-1 transition-all duration-300"
          >
            JavaScript
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="html" className="h-[calc(100%-48px)] m-0 p-0">
          <div ref={htmlContainer} className="h-full w-full"></div>
        </TabsContent>
        
        <TabsContent value="css" className="h-[calc(100%-48px)] m-0 p-0">
          <div ref={cssContainer} className="h-full w-full"></div>
        </TabsContent>
        
        <TabsContent value="js" className="h-[calc(100%-48px)] m-0 p-0">
          <div ref={jsContainer} className="h-full w-full"></div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CodeEditor;
