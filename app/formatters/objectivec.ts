export function formatObjectiveCCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideMethod = false;
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format interface and implementation declarations
      if (line.match(/^@(interface|implementation|protocol)\s+/)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
      }

      // Format method declarations
      if (line.match(/^[+-]\s*\(/)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
        line = line.replace(/\(\s+/, '(');
        line = line.replace(/\s+\)/, ')');
        insideMethod = true;
      }

      // Handle braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Format operators and punctuation
      line = line.replace(/([=+\-*/%&|])\s*([=+\-*/%&|])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,;])\s*/g, '$1 ');
      line = line.replace(/\s*([{}()])\s*/g, '$1');
      line = line.replace(/\s+/g, ' ');

      // Format message sending syntax
      line = line.replace(/\[\s+/g, '[');
      line = line.replace(/\s+\]/g, ']');

      // Add indentation
      const indent = '    '.repeat(Math.max(0, braceCount));
      formattedLines.push(indent + line);

      if (braceCount === 0 && line.match(/^@end/)) {
        insideMethod = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Objective-C code');
  }
}