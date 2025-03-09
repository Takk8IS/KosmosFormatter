export function formatJavaCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideFunction = false;
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format annotations
      if (line.startsWith('@')) {
        line = line.replace(/\(\s+/, '(');
        line = line.replace(/\s+\)/, ')');
      }

      // Format class and method declarations
      if (line.match(/^(public|private|protected|static|final|class|interface|enum)\s+/)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
        line = line.replace(/\(\s+/, '(');
        line = line.replace(/\s+\)/, ')');
        insideFunction = true;
      }

      // Handle braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Format operators and punctuation
      line = line.replace(/([=+\-*/%&|])\s*([=+\-*/%&|])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,;])\s*/g, '$1 ');
      line = line.replace(/\s*([{}()])\s*/g, '$1');
      line = line.replace(/\s+/g, ' ');

      // Add indentation
      const indent = '    '.repeat(Math.max(0, braceCount));
      formattedLines.push(indent + line);

      if (braceCount === 0) {
        insideFunction = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Java code');
  }
}