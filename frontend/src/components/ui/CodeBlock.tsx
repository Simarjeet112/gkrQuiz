import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'cpp',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`relative rounded-xl overflow-hidden border border-arena-border bg-[#05070B] shadow-inner font-mono text-xs sm:text-sm ${className}`}>
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#0C101A] border-b border-arena-border select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 uppercase ml-2 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-arena-violet" />
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-arena-greenNeon" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code snippet lines */}
      <div className="p-3.5 overflow-x-auto text-slate-200 leading-relaxed">
        <table className="border-collapse w-full">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02]">
                <td className="pr-4 text-right select-none text-slate-600 font-mono text-xs w-6 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-slate-100">
                  {/* Basic syntax color highlight regex */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightSyntax(line),
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function highlightSyntax(raw: string): string {
  // Escape HTML characters
  let safe = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Keywords
  safe = safe.replace(
    /\b(include|using|namespace|int|void|return|cout|cin|endl|for|while|if|else|bool|class|public|virtual|override|delete|new|print|def|yield|const|static)\b/g,
    '<span class="text-arena-violet font-semibold">$1</span>'
  );

  // String literals
  safe = safe.replace(/(&quot;.*?&quot;|&#39;.*?&#39;|".*?"|'.*?')/g, '<span class="text-arena-greenNeon">$1</span>');

  // Comments
  safe = safe.replace(/(\/\/.*$|#.*$)/g, '<span class="text-slate-500 italic">$1</span>');

  // Numbers
  safe = safe.replace(/\b(\d+)\b/g, '<span class="text-arena-cyanLight">$1</span>');

  return safe;
}
