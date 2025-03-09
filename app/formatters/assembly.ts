export function formatAssemblyCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideSection = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      if (!line) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format sections and segments
      if (line.match(/^section|segment/i)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        insideSection = true;
      }

      // Format labels
      if (line.match(/^\w+:/)) {
        line = line.trim();
      } else {
        // Add standard indentation for instructions
        line = '    ' + line;
      }

      // Format comments
      if (line.includes(';')) {
        const [code, comment] = line.split(';');
        line = code.trimEnd() + ' ; ' + comment.trim();
      }

      // Format operands
      line = line.replace(/,\s*/g, ', ');
      line = line.replace(/\[\s*/g, '[');
      line = line.replace(/\s*\]/g, ']');

      formattedLines.push(line);

      if (line.match(/^ends?\s*$/i)) {
        insideSection = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Assembly code');
  }
}