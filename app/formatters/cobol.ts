export function formatCOBOLCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideProcedure = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // COBOL uses fixed column positions
      const area_a = line.substring(0, 4).trim();  // Columns 1-4: Sequence number area
      let area_b = line.substring(4, 7).trim();    // Columns 5-7: Indicator area
      let content = line.substring(7).trim();      // Columns 8-72: Content area

      if (!content) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        continue;
      }

      // Format divisions and sections
      if (content.match(/^(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        content = content.replace(/\s+/g, ' ');
      }

      // Format paragraphs and sections
      if (content.match(/^[A-Z0-9-]+\s+SECTION\./)) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        insideProcedure = true;
      }

      // Format statements
      content = content.replace(/\s+/g, ' ').trim();
      
      // Maintain COBOL's column-sensitive format
      const formattedLine = area_a.padEnd(4) + 
                           area_b.padEnd(3) + 
                           content.padEnd(65);
      
      formattedLines.push(formattedLine);

      if (content.match(/^\s*EXIT\s*\./)) {
        insideProcedure = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format COBOL code');
  }
}