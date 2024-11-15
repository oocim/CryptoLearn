import { useState } from 'react';
import { TabsContent } from '../ui/tabs';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card';
import { Play, RotateCcw, BookOpen, Lock, History, ArrowDown, ArrowUp, KeyRound } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

const CaesarCipherTab = () => {
  const [inputText, setInputText] = useState<string>('');
  const [key, setKey] = useState<string>('3');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const caesarCipher = (text: string, shift: string, isDecrypt: boolean = false): string => {
    const actualShift = (isDecrypt ? -1 : 1) * (parseInt(shift) % 26);
    
    return text
      .toUpperCase()
      .split('')
      .map((char: string) => {
        if (char.match(/[A-Z]/)) {
          let code = char.charCodeAt(0) - 65 + actualShift;
          code = ((code % 26) + 26) % 26;
          return String.fromCharCode(code + 65);
        }
        return char;
      })
      .join('');
  };

  const handleOperation = (): void => {
    const result = caesarCipher(inputText, key, mode === 'decrypt');
    setOutput(result);
  };

  return (
    <TabsContent value="caesar-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <KeyRound className="mr-2 text-primary" />
            Caesar Cipher
          </CardTitle>
          <CardDescription>A substitution cipher that shifts letters by a fixed number of positions. Used by Julius Caesar for secret communication.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">With a shift of 13, the Caesar cipher becomes ROT13, where encoding and decoding use the same operation!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 text-primary" />
            Try It Yourself
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex space-x-2">
              <Button
                onClick={() => setMode('encrypt')}
                variant={mode === 'encrypt' ? 'default' : 'outline'}
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                Encrypt
              </Button>
              <Button
                onClick={() => setMode('decrypt')}
                variant={mode === 'decrypt' ? 'default' : 'outline'}
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Decrypt
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Enter {mode === 'encrypt' ? 'plaintext' : 'ciphertext'}:
            </label>
            <textarea
              className="w-full p-3 border rounded-md"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter text to ${mode}...`}
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Shift key (1-25):</label>
            <Input
              type="number"
              min="1"
              max="25"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-24"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <Button onClick={handleOperation}>
              <Play className="mr-2 h-4 w-4" />
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
            <Button
              onClick={() => {
                setInputText('');
                setOutput('');
              }}
              variant="outline"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {output && (
            <div className="bg-muted p-4 rounded-md">
              <label className="block text-sm font-medium mb-2">Result:</label>
              <div className="font-mono break-all">{output}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 text-primary" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Caesar cipher is a substitution cipher that shifts each letter in the 
            text by a fixed number of positions in the alphabet. For decryption, 
            we simply shift in the opposite direction.
          </p>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-semibold mb-2">Example:</h3>
            <p>With a shift of 3:</p>
            <div className="font-mono mt-2">
              Encryption:<br />
              A → D<br />
              B → E<br />
              C → F<br />
              <br />
              Decryption:<br />
              D → A<br />
              E → B<br />
              F → C
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 text-primary" />
            Security Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Security Level: Basic</h3>
          <div className="flex items-center mb-4">
            <div className="h-2 w-24 bg-destructive rounded-full" />
            <div className="h-2 w-24 bg-muted rounded-full ml-1" />
            <div className="h-2 w-24 bg-muted rounded-full ml-1" />
          </div>
          <p className="text-sm text-muted-foreground">
            The Caesar cipher is easily broken and should only be used for 
            educational purposes. It can be cracked using frequency analysis 
            or by trying all 25 possible shifts.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CaesarCipherTab;