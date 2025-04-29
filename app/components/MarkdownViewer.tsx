// app/components/MarkdownViewer.js
'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
//import remarkGfm from 'remark-gfm';
//import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <article className="markdown-custom">
      <ReactMarkdown>
          {content}
      </ReactMarkdown>
    </article>
  );
}