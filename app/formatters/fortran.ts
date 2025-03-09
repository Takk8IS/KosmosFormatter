export function formatFortranCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideSubroutine = false;
    let indentLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format program and subroutine declarations
      if (line.match(/^(program|subroutine|function|module)\s+/i)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        line = line.replace(/\s+/g, ' ');
        insideSubroutine = true;
        indentLevel++;
      }

      // Handle control structures
      if (line.match(/^(if|do|select case)\s+/i)) {
        indentLevel++;
      }
      if (line.match(/^(end|endif|enddo|end select)\s*/i)) {
        indentLevel--;
      }

      // Format operators and assignments
      line = line.replace(/([=+\-*\/])\s*([=+\-*\/])?/g, ' $1$2 ').trim();
      line = line.replace(/\s*([,])\s*/g, '$1 ');

      // Add indentation (Fortran 90+ style)
      const indent = '  '.repeat(Math.max(0, indentLevel));
      formattedLines.push(indent + line);

      if (line.match(/^end\s+/i)) {
        insideSubroutine = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Fortran code');
  }
}