export function formatPHPCode(code: string): string {
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

      // Format PHP tags
      if (line.includes('<?php')) {
        line = '<?php';
        formattedLines.push(line);
        formattedLines.push('');
        continue;
      }

      // Format function and class declarations
      if (line.match(/^(function|class|interface|trait|public|private|protected|static)\s+/)) {
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

      // Format variable names
      line = line.replace(/\$\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, '$$1');

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
    throw new Error('Failed to format PHP code');
  }
}