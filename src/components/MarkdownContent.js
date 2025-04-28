import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';

// Composant pour le bouton de copie avec état interne
const CopyButton = ({ code }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <button
      onClick={handleCopy}
      className={`copy-button ${copied ? 'copied' : ''}`}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

// Composant pour un bloc de code avec bouton de copie et badge de langage
const CodeBlock = ({ className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'code';
  const codeContent = String(children).replace(/\n$/, '');
  
  return (
    <div className="code-container">
      <CopyButton code={codeContent} />
      <span className="code-language-badge">{language}</span>
      <pre>
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
};

const MarkdownContent = ({ content }) => {
  return (
    <div className="markdown-content prose prose-blue prose-lg max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full divide-y divide-gray-200 border" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-50" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="bg-white divide-y divide-gray-200" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-gray-50" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 rounded-r-md" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            
            if (!inline && match) {
              if (match[1] === 'mermaid') {
                // Pour Mermaid, juste afficher comme un bloc de code normal pour éviter les problèmes
                return (
                  <pre className="mermaid-code">
                    <code className={className} {...props}>
                      {children}
                    </code>
                    <div className="text-xs text-gray-500 mt-2 italic">
                      Mermaid diagrams are temporarily displayed as code.
                    </div>
                  </pre>
                );
              }
              
              // Pour les autres langages, utiliser le composant CodeBlock avec bouton de copie
              return <CodeBlock className={className}>{children}</CodeBlock>;
            }
            
            // Pour le code inline
            return (
              <code
                className={className || ''}
                {...props}
              >
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-3" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-gray-700 my-4 leading-relaxed" {...props} />
          ),
          ul: ({ node, ordered, ...props }) => (
            <ul className="my-4 pl-8 list-disc space-y-2" {...props} />
          ),
          ol: ({ node, ordered, ...props }) => (
            <ol className="my-4 pl-8 list-decimal space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-700" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-gray-900" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img className="rounded-lg shadow-md max-w-full my-6" {...props} />
          ),
          pre: ({ node, children, ...props }) => {
            // Laisser le pré-formatage être géré par le composant code
            return <>{children}</>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
      
      <style jsx global>{`
        /* Styles pour les onglets */
        .tabset {
          display: flex;
          flex-wrap: wrap;
          margin: 2rem 0;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .tabset input[type="radio"] {
          position: absolute;
          opacity: 0;
        }
        
        .tabset label {
          cursor: pointer;
          padding: 0.75rem 1.5rem;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 500;
          color: #4b5563;
          transition: all 0.2s;
        }
        
        .tabset label:hover {
          background-color: #f3f4f6;
        }
        
        .tabset input[type="radio"]:checked + label {
          background-color: #fff;
          color: #2563eb;
          border-bottom: 2px solid #2563eb;
        }
        
        .tab-panels {
          width: 100%;
        }
        
        .tab-panel {
          display: none;
          padding: 1.5rem;
          background-color: #fff;
        }
        
        .tabset input[type="radio"]:nth-of-type(1):checked ~ .tab-panels .tab-panel:nth-of-type(1),
        .tabset input[type="radio"]:nth-of-type(2):checked ~ .tab-panels .tab-panel:nth-of-type(2),
        .tabset input[type="radio"]:nth-of-type(3):checked ~ .tab-panels .tab-panel:nth-of-type(3),
        .tabset input[type="radio"]:nth-of-type(4):checked ~ .tab-panels .tab-panel:nth-of-type(4),
        .tabset input[type="radio"]:nth-of-type(5):checked ~ .tab-panels .tab-panel:nth-of-type(5) {
          display: block;
        }
        
        /* Styles pour les callouts et exemples */
        .callout {
          margin: 1.5rem 0;
          padding: 1.25rem;
          border-radius: 0.5rem;
          border-left: 4px solid #3b82f6;
          background-color: #f0f9ff;
        }
        
        .callout.example {
          border-left-color: #10b981;
          background-color: #ecfdf5;
        }
        
        .callout.warning {
          border-left-color: #f59e0b;
          background-color: #fffbeb;
        }
        
        .callout.danger {
          border-left-color: #ef4444;
          background-color: #fef2f2;
        }
        
        .callout h3 {
          margin-top: 0;
          color: #1f2937;
        }
        
        /* Style Mermaid temporaire */
        .mermaid-code {
          background-color: #f8fafc !important;
          border: 1px dashed #94a3b8 !important;
        }
      `}</style>
    </div>
  );
};

export default MarkdownContent; 