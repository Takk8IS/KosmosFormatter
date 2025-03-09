export function formatVisualBasicCode(code: string): string {
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

      // Format module, class, and function declarations
      if (line.match(/^(Module|Class|Function|Sub|Property|Private|Public|Protected|Friend)\s+/i)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
        line = line.replace(/\(\s+/, '(');
        line = line.replace(/\s+\)/, ')');
        insideFunction = true;
        indentLevel++;
      }

      // Handle end statements
      if (line.match(/^End\s+(Module|Class|Function|Sub|Property)/i)) {
        indentLevel--;
        line = line.replace(/\s+/g, ' ');
      }

      // Format operators and assignments
      line = line.replace(/([=+\-*\/\\])\s*([=+\-*\/\\])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,])\s*/g, '$1 ');
      line = line.replace(/\s+/g, ' ');

      // Format line continuation
      line = line.replace(/\s+_\s*$/, ' _');

      // Add indentation
      const indent = '    '.repeat(Math.max(0, indentLevel));
      formattedLines.push(indent + line);

      if (line.match(/^End\s+(Module|Class|Function|Sub|Property)/i)) {
        insideFunction = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Visual Basic code');
  }
}