import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://kosmos-formatter.vercel.app"),
    title: {
        default: "Kosmos - Multi-Language Code Formatter",
        template: "%s | Kosmos Code Formatter",
    },
    description:
        "Free online code formatter supporting multiple programming languages. Clean and format your code with intelligent syntax highlighting and consistent style rules.",
    keywords: [
        "code formatter",
        "code beautifier",
        "syntax formatter",
        "code cleaner",
        "pretty print",
        "source code formatter",
        "python formatter",
        "javascript formatter",
        "typescript formatter",
    ],
    authors: [
        {
            name: "David C Cavalcante",
            url: "https://www.linkedin.com/in/hellodav/",
        },
    ],
    creator: "David C Cavalcante",
    publisher: "Kosmos",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en",
            "pt-BR": "/pt",
            "es-ES": "/es",
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://kosmos-formatter.vercel.app",
        title: "Kosmos - Multi-Language Code Formatter",
        description:
            "Free online code formatter supporting multiple programming languages. Clean and format your code with intelligent syntax highlighting and consistent style rules.",
        siteName: "Kosmos Code Formatter",
        images: [
            {
                url: "https://kosmos-formatter.vercel.app/og-image.png",
                width: 1200,
                height: 630,
                alt: "Kosmos Code Formatter Preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kosmos - Multi-Language Code Formatter",
        description:
            "Free online code formatter supporting multiple programming languages. Clean and format your code with intelligent syntax highlighting.",
        images: ["https://kosmos-formatter.vercel.app/og-image.png"],
    },
    manifest: "/site.webmanifest",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    other: {
        "google-site-verification": "your-verification-code",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="alternate"
                    hrefLang="en"
                    href="https://kosmos-formatter.vercel.app/en"
                />
                <link
                    rel="alternate"
                    hrefLang="pt"
                    href="https://kosmos-formatter.vercel.app/pt"
                />
                <link
                    rel="alternate"
                    hrefLang="es"
                    href="https://kosmos-formatter.vercel.app/es"
                />
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href="https://kosmos-formatter.vercel.app"
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
