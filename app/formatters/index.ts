import { formatPythonCode } from './python';
import { formatJavaScriptCode } from './javascript';
import { formatTypeScriptCode } from './typescript';
import { formatGoCode } from './go';
import { formatRustCode } from './rust';
import { formatKotlinCode } from './kotlin';
import { formatSwiftCode } from './swift';
import { formatCSharpCode } from './csharp';
import { formatJavaCode } from './java';
import { formatPHPCode } from './php';
import { formatRubyCode } from './ruby';
import { formatRCode } from './r';
import { formatObjectiveCCode } from './objectivec';
import { formatMATLABCode } from './matlab';
import { formatScalaCode } from './scala';
import { formatPerlCode } from './perl';
import { formatVisualBasicCode } from './visualbasic';
import { formatDelphiCode } from './delphi';
import { formatCOBOLCode } from './cobol';
import { formatAdaCode } from './ada';
import { formatFortranCode } from './fortran';
import { formatPascalCode } from './pascal';
import { formatAssemblyCode } from './assembly';

export type Language = 
  | 'python' 
  | 'javascript' 
  | 'typescript'
  | 'go' 
  | 'rust'
  | 'kotlin'
  | 'swift'
  | 'csharp'
  | 'java'
  | 'php'
  | 'ruby'
  | 'r'
  | 'objectivec'
  | 'matlab'
  | 'scala'
  | 'perl'
  | 'visualbasic'
  | 'delphi'
  | 'cobol'
  | 'ada'
  | 'fortran'
  | 'pascal'
  | 'assembly';

export const formatters = {
  python: formatPythonCode,
  javascript: formatJavaScriptCode,
  typescript: formatTypeScriptCode,
  go: formatGoCode,
  rust: formatRustCode,
  kotlin: formatKotlinCode,
  swift: formatSwiftCode,
  csharp: formatCSharpCode,
  java: formatJavaCode,
  php: formatPHPCode,
  ruby: formatRubyCode,
  r: formatRCode,
  objectivec: formatObjectiveCCode,
  matlab: formatMATLABCode,
  scala: formatScalaCode,
  perl: formatPerlCode,
  visualbasic: formatVisualBasicCode,
  delphi: formatDelphiCode,
  cobol: formatCOBOLCode,
  ada: formatAdaCode,
  fortran: formatFortranCode,
  pascal: formatPascalCode,
  assembly: formatAssemblyCode,
} as const;