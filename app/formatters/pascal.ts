export function formatPascalCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideProcedure = false;
    let indentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format program and procedure declarations
      if (line.match(/^(program|procedure|function)\s+/i)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
        line = line.replace(/\(\s+/, '(');
        line = line.replace(/\s+\)/, ')');
        insideProcedure = true;
      }

      // Handle begin/end blocks
      if (line.match(/^begin\s*$/i)) {
        indentLevel++;
      }
      if (line.match(/^end[;]?\s*$/i)) {
        indentLevel--;
      }

      // Format operators and assignments
      line = line.replace(/([=+\-*\/])\s*([=+\-*\/])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,;])\s*/g, '$1 ');
      line = line.replace(/:\s*=\s*/, ' := ');

      // Add indentation
      const indent = '  '.repeat(Math.max(0, indentLevel));
      formattedLines.push(indent + line);

      if (line.match(/^end[;]?\s*$/i)) {
        insideProcedure = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Pascal code');
  }
}