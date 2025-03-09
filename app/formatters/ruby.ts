export function formatRubyCode(code: string): string {
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

      // Format class and method declarations
      if (line.match(/^(class|module|def|private|protected|public)\s+/)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
        insideFunction = true;
      }

      // Handle indentation based on keywords
      if (line.match(/^(class|module|def|if|unless|while|until|begin|case)\s+/)) {
        indentLevel++;
      }
      if (line.match(/^(end|else|elsif|when|rescue|ensure)\s*$/)) {
        indentLevel--;
      }

      // Format operators and punctuation
      line = line.replace(/([=+\-*/%])\s*([=+\-*/%])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,;])\s*/g, '$1 ');
      line = line.replace(/\s+/g, ' ');

      // Format hash rockets and symbols
      line = line.replace(/\s*=>\s*/g, ' => ');
      line = line.replace(/:\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, ':$1');

      // Add indentation
      const indent = '  '.repeat(Math.max(0, indentLevel));
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
    throw new Error('Failed to format Ruby code');
  }
}