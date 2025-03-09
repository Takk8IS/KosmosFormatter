"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeIcon, CopyIcon, WandIcon, GithubIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Language, formatters } from "./formatters";

export default function Home() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState<Language>("python");
    const [reportUrl, setReportUrl] = useState("#");
    const { toast } = useToast();

    useEffect(() => {
        const browserInfo = window.navigator.userAgent;
        const issueTemplate = encodeURIComponent(`**Description of the Issue**
Please describe what happened and what you expected to happen.

**Steps to Reproduce**
1.
2.
3.

**Code Sample**
\`\`\`${language}
${input}
\`\`\`

**Additional Information**
- Language: ${language}
- Browser: ${browserInfo}
`);
        setReportUrl(
            `https://github.com/Takk8IS/KosmosFormatter/issues/new?body=${issueTemplate}`,
        );
    }, [language, input]);

    const formatCode = () => {
        try {
            const formatter = formatters[language];
            const formattedCode = formatter(input);
            setOutput(formattedCode);
            toast({
                title: "Code formatted successfully",
                description: `Your ${language} code has been formatted.`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error formatting code",
                description: `Please check your ${language} code syntax.`,
            });
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(output);
            toast({
                title: "Copied to clipboard",
                description:
                    "The formatted code has been copied to your clipboard.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to copy",
                description: "Could not copy the code to clipboard.",
            });
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center mb-12 space-y-4">
                    <CodeIcon className="h-12 w-12 text-[color:var(--text)]" />
                    <h1 className="text-3xl font-extralight tracking-tight uppercase">
                        Kosmos Code Formatter
                    </h1>
                    <p className="text-lg text-muted mb-6">
                        A sophisticated code formatter for clean, consistent
                        code
                    </p>
                    <div className="flex items-center space-x-3 mb-8">
                        <span className="text-sm text-muted">
                            Select language:
                        </span>
                        <Select
                            value={language}
                            onValueChange={(value) =>
                                setLanguage(value as Language)
                            }
                        >
                            <SelectTrigger className="w-[180px] bg-background border-border text-[color:var(--text)]">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                                {Object.keys(formatters).map((lang) => (
                                    <SelectItem
                                        key={lang}
                                        value={lang}
                                        className="text-[color:var(--text)] hover:bg-primary-30"
                                    >
                                        {lang.charAt(0).toUpperCase() +
                                            lang.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-card border-border p-6">
                        <div className="mb-6">
                            <h2 className="text-lg text-[color:var(--text)]">
                                Input Code
                            </h2>
                        </div>
                        <Textarea
                            placeholder={`Paste your ${language} code here...`}
                            className="min-h-[400px] font-mono bg-background border-border text-[color:var(--text)] resize-none mb-4"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            className="w-full button-minimal"
                            onClick={formatCode}
                            disabled={!input}
                        >
                            <WandIcon className="mr-2 h-4 w-4" />
                            Format Code
                        </Button>
                    </Card>

                    <Card className="bg-card border-border p-6">
                        <h2 className="text-lg text-[color:var(--text)] mb-6">
                            Formatted Code
                        </h2>
                        <Textarea
                            readOnly
                            className="min-h-[400px] font-mono bg-background border-border text-[color:var(--text)] resize-none mb-4"
                            value={output}
                            placeholder="Formatted code will appear here..."
                        />
                        <Button
                            className="w-full button-minimal"
                            onClick={copyToClipboard}
                            disabled={!output}
                        >
                            <CopyIcon className="mr-2 h-4 w-4" />
                            Copy to Clipboard
                        </Button>
                    </Card>
                </div>

                <footer className="mt-16 text-center text-sm text-muted">
                    <div className="flex items-center justify-center space-x-4">
                        <a
                            href="https://www.linkedin.com/in/hellodav/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[color:var(--text)] transition-colors"
                        >
                            © David C Cavalcante
                        </a>
                        <span>•</span>
                        <a
                            href={reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[color:var(--text)] transition-colors flex items-center"
                        >
                            <GithubIcon className="w-4 h-4 mr-1" />
                            Report an Issue
                        </a>
                    </div>
                </footer>
            </div>
        </main>
    );
}
