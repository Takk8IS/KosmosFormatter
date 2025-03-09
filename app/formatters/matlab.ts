export function formatMATLABCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideFunction = false;
    let indentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format function declarations
      if (line.startsWith('function')) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
        line = line.replace(/\(\s+/, '(');
        line = line.replace(/\s+\)/, ')');
        insideFunction = true;
      }

      // Handle indentation based on keywords
      if (line.match(/^(function|if|for|while|switch|try)\s+/)) {
        indentLevel++;
      }
      if (line.match(/^(end|else|elseif|catch)\s*$/)) {
        indentLevel--;
      }

      // Format operators and matrix operations
      line = line.replace(/([=+\-*/%])\s*([=+\-*/%])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,;])\s*/g, '$1 ');
      line = line.replace(/\s*([[\]()])\s*/g, '$1');
      line = line.replace(/\.\*|\.\^|\.\//g, (match) => ` ${match} `);

      // Add indentation
      const indent = '    '.repeat(Math.max(0, indentLevel));
      formattedLines.push(indent + line);

      if (line === 'end') {
        insideFunction = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format MATLAB code');
  }
}