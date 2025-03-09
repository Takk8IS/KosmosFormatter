import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                text: "var(--text)",
                primary: {
                    DEFAULT: "var(--primary)",
                    "80": "var(--primary-80)",
                    "40": "var(--primary-40)",
                    "30": "var(--primary-30)",
                },
                card: "var(--card)",
                border: "var(--border)",
                muted: "var(--muted)",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["IBM Plex Mono", "monospace"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
