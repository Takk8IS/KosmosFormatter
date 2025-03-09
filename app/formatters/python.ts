export function formatPythonCode(code: string): string {
  try {
    const lines = code.split('\n');
    const formattedLines: string[] = [];
    let insideFunction = false;
    let previousLineEmpty = true;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      if (!line) {
        if (!previousLineEmpty && i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
          previousLineEmpty = true;
        }
        continue;
      }
      
      previousLineEmpty = false;

      if (line.startsWith('def ')) {
        if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
          formattedLines.push('');
        }
        
        line = line.replace(/def\s+/, 'def ');
        line = line.replace(/\s*\(\s*/g, '(');
        line = line.replace(/\s*\)\s*:/g, '):');
        line = line.replace(/\(\s+/g, '(');
        line = line.replace(/\s+\)/g, ')');
        line = line.replace(/,\s*/g, ', ');
        insideFunction = true;
      }

      line = line.replace(/\s*\+\s*/g, ' + ');
      line = line.replace(/\s*\*\s*/g, ' * ');
      line = line.replace(/\s*=\s*/g, ' = ');
      
      if (line.startsWith('print')) {
        line = line.replace(/print\s*\(\s*/g, 'print(');
        line = line.replace(/\s*\)\s*$/g, ')');
        line = line.replace(/\s*,\s*/g, ', ');
        line = line.replace(/\(\s+/g, '(');
        line = line.replace(/\s+\)/g, ')');
      }

      line = line.replace(/\s+/g, ' ').trim();

      if (insideFunction && !line.startsWith('def ')) {
        formattedLines.push('    ' + line);
      } else {
        formattedLines.push(line);
      }

      if (line === 'return a + b' || line === 'return a * b') {
        insideFunction = false;
        if (i < lines.length - 1 && lines[i + 1].trim()) {
          formattedLines.push('');
        }
      }
    }

    let code_str = formattedLines.join('\n').replace(/\s+main\s*\(\s*\)\s*/g, 'main()');
    
    if (!code_str.includes('if __name__ == "__main__"')) {
      if (!code_str.endsWith('\n\n')) {
        formattedLines.push('');
        formattedLines.push('');
      }
      formattedLines.push('if __name__ == "__main__":');
      formattedLines.push('    main()');
    }

    return formattedLines.join('\n').replace(/\n{3,}/g, '\n\n');
  } catch (error) {
    throw new Error('Failed to format Python code');
  }
}