export function formatGoCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideFunction = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format function declarations
      if (line.startsWith('func ')) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/func\s+/, 'func ');
        line = line.replace(/\(\s+/, '(');
        line = line.replace(/\s+\)/, ')');
        insideFunction = true;
      }

      // Format operators and punctuation
      line = line.replace(/([=+\-*/%])\s*([=+\-*/%])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,;])\s*/g, '$1 ');
      line = line.replace(/\s*([{}()])\s*/g, '$1');

      // Add indentation for blocks
      if (insideFunction && !line.startsWith('func ')) {
        formattedLines.push('\t' + line);
      } else {
        formattedLines.push(line);
      }

      if (line === '}') {
        insideFunction = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Go code');
  }
}