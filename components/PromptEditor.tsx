import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Copy, Check } from 'lucide-react';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function PromptEditor({
  value,
  onChange,
  placeholder = 'Escribe tu prompt aquí...',
  className = ''
}: PromptEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [highlightedContent, setHighlightedContent] = useState('');

  useEffect(() => {
    // Simple syntax highlighting for prompt patterns
    const highlighted = value
      .replace(/\[([^\]]+)\]/g, '<span class="text-indigo-400">[$1]</span>') // [placeholders]
      .replace(/\{([^}]+)\}/g, '<span class="text-purple-400">{$1}</span>') // {variables}
      .replace(/"([^"]+)"/g, '<span class="text-emerald-400">"$1"</span>') // "quoted text"
      .replace(/^(#{1,6})\s(.+)$/gm, '<span class="text-yellow-400 font-bold">$1 $2</span>') // # Headers
      .replace(/\*\*([^*]+)\*\*/g, '<span class="font-bold text-white">$1</span>') // **bold**
      .replace(/\*([^*]+)\*/g, '<span class="italic text-slate-300">$1</span>'); // *italic*

    setHighlightedContent(highlighted);
  }, [value]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const editorContent = (
    <div className={`relative ${isFullscreen ? 'h-full' : ''}`}>
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={handleCopy}
          className="p-2 bg-slate-700/80 hover:bg-slate-600 backdrop-blur-sm rounded-lg transition-colors"
          title="Copiar"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-300" />
          )}
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 bg-slate-700/80 hover:bg-slate-600 backdrop-blur-sm rounded-lg transition-colors"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-slate-300" />
          ) : (
            <Maximize2 className="w-4 h-4 text-slate-300" />
          )}
        </button>
      </div>

      <div className="relative">
        {/* Highlighted background layer */}
        <div
          className="absolute inset-0 p-4 font-mono text-sm whitespace-pre-wrap pointer-events-none overflow-hidden"
          dangerouslySetInnerHTML={{ __html: highlightedContent || placeholder }}
        />

        {/* Editable textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-transparent relative z-10 font-mono text-sm text-transparent caret-white resize-none focus:outline-none ${
            isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-64'
          } ${className}`}
          style={{
            caretColor: 'white',
            WebkitTextFillColor: 'transparent'
          }}
        />
      </div>

      {/* Character count */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-500">
        {value.length} caracteres
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 p-6">
        <div className="h-full bg-slate-800 border border-slate-700 rounded-lg p-4">
          {editorContent}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      {editorContent}
    </div>
  );
}
