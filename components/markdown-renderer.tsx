"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Importação dinâmica do SyntaxHighlighter para evitar erros de SSR
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

// Importação dinâmica dos estilos
const importStyle = (style: string) =>
  dynamic(
    () =>
      import("react-syntax-highlighter/dist/esm/styles/prism").then(
        (mod) => mod[style]
      ),
    { ssr: false }
  );

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [codeStyle, setCodeStyle] = useState<any>(null);

  // Carregar o estilo apropriado com base no tema
  useEffect(() => {
    const loadStyle = async () => {
      if (isDark) {
        const { vscDarkPlus } = await import(
          "react-syntax-highlighter/dist/esm/styles/prism"
        );
        setCodeStyle(vscDarkPlus);
      } else {
        const { vs } = await import(
          "react-syntax-highlighter/dist/esm/styles/prism"
        );
        setCodeStyle(vs);
      }
    };

    loadStyle();
  }, [isDark]);

  // Renderizar o conteúdo Markdown
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match && SyntaxHighlighter && codeStyle) {
              return (
                <SyntaxHighlighter
                  style={codeStyle}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            // Fallback para quando o SyntaxHighlighter não estiver disponível
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ node, ...props }) {
            return (
              <img
                {...props}
                className="rounded-md max-w-full h-auto"
                loading="lazy"
              />
            );
          },
          table({ node, ...props }) {
            return (
              <div className="overflow-x-auto">
                <table
                  {...props}
                  className="border-collapse table-auto w-full"
                />
              </div>
            );
          },
          th({ node, ...props }) {
            return (
              <th
                {...props}
                className="border px-4 py-2 bg-gray-100 dark:bg-gray-800"
              />
            );
          },
          td({ node, ...props }) {
            return <td {...props} className="border px-4 py-2" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
