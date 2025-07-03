import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AskOutputProps {
    prompt: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-[var(--accent-cyan)]"></div>
        <span>Thinking...</span>
    </div>
);

const AskOutput: React.FC<AskOutputProps> = ({ prompt }) => {
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnswer = async () => {
            if (!prompt) {
                setError("Please provide a question after the 'ask' command. Usage: ask <your question>");
                setIsLoading(false);
                return;
            }

            if (!process.env.API_KEY) {
                setError("API key is not configured. The 'ask' command is currently disabled.");
                setIsLoading(false);
                return;
            }

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const result = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-preview-04-17',
                    contents: prompt,
                });
                
                setResponse(result.text);

            } catch (e) {
                console.error("Gemini API error:", e);
                setError("Sorry, I encountered an error while trying to answer. The API key might be invalid or the service may be unavailable. Please check the console for details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnswer();
    }, [prompt]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="text-[var(--accent-red)]">{error}</p>;
    }

    return (
        <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {response}
            </ReactMarkdown>
            <style>{`
                .prose {
                    color: var(--text-primary);
                }
                .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                    color: var(--text-bright);
                    margin-top: 1.25em;
                    margin-bottom: 0.5em;
                }
                .prose p {
                    margin-top: 0.75em;
                    margin-bottom: 0.75em;
                }
                .prose a {
                    color: var(--accent-cyan);
                    text-decoration: underline;
                }
                .prose strong {
                    color: var(--accent-green-light);
                }
                .prose blockquote {
                    border-left: 3px solid var(--border-secondary);
                    color: var(--text-secondary);
                    padding-left: 1em;
                    margin-left: 0;
                }
                .prose code {
                    background-color: var(--bg-tertiary-alpha);
                    color: var(--accent-orange);
                    padding: 0.2em 0.4em;
                    margin: 0;
                    font-size: 85%;
                    border-radius: 6px;
                }
                .prose pre {
                    background-color: var(--bg-tertiary);
                    border: 1px solid var(--border-primary);
                    padding: 1em;
                    border-radius: 8px;
                    overflow-x: auto;
                }
                 .prose pre code {
                    color: var(--text-primary);
                    background-color: transparent;
                    padding: 0;
                    margin: 0;
                    font-size: inherit;
                    border-radius: 0;
                    border: none;
                }
                 .prose ul, .prose ol {
                    padding-left: 1.5em;
                 }
                 .prose li {
                    margin-top: 0.25em;
                    margin-bottom: 0.25em;
                 }
            `}</style>
        </div>
    );
};

export default AskOutput;
