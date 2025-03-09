# Kosmos Code Formatter

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)](https://github.com/Takk8IS/KosmosFormatter)
[![Licence](https://img.shields.io/badge/licence-CC--BY--4.0-green.svg?style=for-the-badge)](https://creativecommons.org/licenses/by/4.0/)
[![GitHub issues](https://img.shields.io/github/issues/Takk8IS/KosmosFormatter.svg?style=for-the-badge)](https://github.com/Takk8IS/KosmosFormatter/issues)
[![GitHub stars](https://img.shields.io/github/stars/Takk8IS/KosmosFormatter.svg?style=for-the-badge)](https://github.com/Takk8IS/KosmosFormatter/stargazers)

A sophisticated web-based code formatter for clean, consistent code across multiple programming languages.

## 📋 Description

Kosmos Code Formatter is a powerful, web-based tool designed to help developers format their code with ease. Supporting a wide range of programming languages, it provides instant formatting with a simple, intuitive interface. Whether you're working with Python, JavaScript, TypeScript, Go, Rust, or any of the other supported languages, Kosmos Code Formatter ensures your code follows consistent style conventions.

## ✨ Features

- **Multi-language Support**: Format code in 24 programming languages including Python, JavaScript, TypeScript, Rust, Go, and more
- **Real-time Formatting**: Instantly see formatted code as you type or paste
- **Copy to Clipboard**: One-click copy functionality for the formatted code
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **GitHub Integration**: Direct GitHub issue reporting for bugs or feature requests
- **Language Detection**: Automatic language detection for pasted code (coming soon)
- **Format Selection**: Format only selected parts of your code (coming soon)

## 🛠️ Technologies

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Deployment**: Vercel

## 🚀 Installation

To run Kosmos Code Formatter locally:

```bash
# Clone the repository
git clone https://github.com/Takk8IS/KosmosFormatter.git

# Navigate to the project directory
cd Kosmos Code Formatter

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔍 Usage

1. Select a programming language from the dropdown menu
2. Paste or type your code in the input area
3. Your formatted code will appear in the output area
4. Click the "Copy" button to copy the formatted code to your clipboard
5. Use the formatted code in your project

## 📁 Project Structure

```
Kosmos Code Formatter/
├── app/                    # Main application code
│   ├── formatters/         # Language-specific formatters
│   │   ├── index.ts        # Exports all formatters
│   │   ├── python.ts       # Python formatter
│   │   ├── javascript.ts   # JavaScript formatter
│   │   └── ...             # Other language formatters
│   ├── layout.tsx          # App layout component
│   └── page.tsx            # Main page component
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI components
│   └── theme-provider.tsx  # Theme management
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── lib/                    # Utility functions
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## 📜 Licence

This project is licensed under the CC-BY-4.0 Licence. See the [LICENSE](LICENSE) file for more details.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 💡 Donations

If this project has been helpful, consider making a donation:

**USDT (TRC-20)**: `TP6zpvjt2ZNGfWKPevfp65ZrcbKMWSQXDi`

Your support helps us continue to develop innovative tools.

## 🔧 Support

To contribute to public and social projects focused on research and artificial intelligence, feel free to support with any amount you prefer.

## 👥 About the Author

### 🧠 Takk™ Innovate Studio

- **Author**: David C Cavalcante
- **LinkedIn**: [David C Cavalcante](https://www.linkedin.com/in/hellodav/)
- **Medium**: [David C Cavalcante](https://medium.com/@davcavalcante/)
- **Positive results, rapid innovation**
- **Leading the Digital Revolution as the Pioneering 100% Artificial Intelligence Team**
- **URL**: [Takk](https://takk.ag/)
- **Twitter**: [Takk](https://twitter.com/takk8is/)
- **Medium**: [Takk](https://takk8is.medium.com/)
