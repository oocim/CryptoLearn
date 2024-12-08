import React, { useState, useEffect } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Play, RotateCcw, ArrowRight, History, Lock, ArrowUp, ArrowDown, BookOpen, ChevronLeft, ChevronRight, KeyRound, PlayCircle, PauseCircle, X } from 'lucide-react'
import infoIcon from './i.png';

interface Step {
  title: string;
  description: string;
  visualization: string[][];
  result: string;
  detail: string;
  highlightPair: [string, string];
}

const PlayfairCipherTab = () => {
  const [inputText, setInputText] = useState('HELLO WORLD')
  const [keyText, setKeyText] = useState('MONARCHY')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [grid, setGrid] = useState<string[][]>([])

  // Generate Playfair grid from key
  const generateGrid = (key: string): string[][] => {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note: I/J are combined
    let matrix: string[] = [];
    let used = new Set<string>();

    // Clean and uppercase the key
    const cleanKey = key.toUpperCase()
      .replace(/J/g, 'I')
      .replace(/[^A-Z]/g, '');

    // Add key characters to matrix
    for (let char of cleanKey) {
      if (!used.has(char)) {
        used.add(char);
        matrix.push(char);
      }
    }

    // Add remaining alphabet
    for (let char of alphabet) {
      if (!used.has(char)) {
        matrix.push(char);
        used.add(char);
      }
    }

    // Convert to 5x5 grid
    return Array.from({ length: 5 }, (_, i) => 
      matrix.slice(i * 5, (i + 1) * 5)
    );
  };

  // Find coordinates of a character in the grid
  const findInGrid = (grid: string[][], char: string): [number, number] | null => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[i][j] === char) {
          return [i, j];
        }
      }
    }
    return null;
  };

  // Encrypt text using Playfair cipher
  const playfairCipher = (text: string, key: string, isDecrypt: boolean = false): string => {
    const grid = generateGrid(key);
    setGrid(grid);

    // Prepare text (convert to uppercase, replace J with I, remove non-letters)
    let cleanText = text.toUpperCase()
      .replace(/J/g, 'I')
      .replace(/[^A-Z]/g, '');

    // Split into digraphs, pad if necessary
    let digraphs: string[] = [];
    for (let i = 0; i < cleanText.length; i += 2) {
      let pair = cleanText.slice(i, i + 2);
      if (pair.length === 1) {
        pair += 'X';
      } else if (pair[0] === pair[1]) {
        pair = pair[0] + 'X';
        i--;
      }
      digraphs.push(pair);
    }

    // Encrypt or decrypt each digraph
    let result = '';
    let newSteps: Step[] = [{
      title: "Initial Setup",
      description: `${isDecrypt ? 'Ciphertext' : 'Plaintext'}: "${text}" with key "${key}"`,
      visualization: grid,
      result: '',
      detail: "Generated Playfair grid from the key",
      highlightPair: ['', '']
    }];

    for (let [index, digraph] of digraphs.entries()) {
      const [row1, col1] = findInGrid(grid, digraph[0])!;
      const [row2, col2] = findInGrid(grid, digraph[1])!;

      let char1: string, char2: string;

      if (row1 === row2) { // Same row
        char1 = grid[row1][(col1 + (isDecrypt ? 4 : 1)) % 5];
        char2 = grid[row2][(col2 + (isDecrypt ? 4 : 1)) % 5];
      } else if (col1 === col2) { // Same column
        char1 = grid[(row1 + (isDecrypt ? 4 : 1)) % 5][col1];
        char2 = grid[(row2 + (isDecrypt ? 4 : 1)) % 5][col2];
      } else { // Rectangle
        char1 = grid[row1][col2];
        char2 = grid[row2][col1];
      }

      result += char1 + char2;

      newSteps.push({
        title: `Step ${index + 1}: Processing "${digraph}"`,
        description: `${isDecrypt ? 'Decrypting' : 'Encrypting'} digraph ${digraph} → ${char1}${char2}`,
        visualization: grid.map((row, i) => 
          row.map((cell, j) => 
            (i === row1 && j === col1) || (i === row2 && j === col2) ? `[${cell}]` : cell
          )
        ),
        result: result,
        detail: `Applied Playfair rules to ${isDecrypt ? 'decrypt' : 'encrypt'} the digraph`,
        highlightPair: [digraph, char1 + char2]
      });
    }

    setSteps(newSteps);
    return result;
  };

  const handleOperation = () => {
    const result = playfairCipher(inputText, keyText, mode === 'decrypt');
    setOutput(result);
    setCurrentStep(0);
    setShowBreakdown(true);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 2000);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  return (
    <TabsContent value="playfair-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <KeyRound className="mr-2 text-primary" />
            Playfair Cipher
          </CardTitle>
          <CardDescription>An advanced polygraphic substitution cipher invented in 1854.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The Playfair cipher encrypts pairs of letters, making it significantly harder to break than simple substitution ciphers.</p>
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
        <div className="space-y-4">
            <p>
              The Playfair cipher uses a 5x5 grid of letters constructed using a keyword. 
              Pairs of letters from the plaintext are transformed according to their position in the grid.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Key Steps:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create a 5x5 grid using the keyword (excluding duplicates) and fill with remaining alphabet letters (I/J share a cell).</li>
                <li>Divide the plaintext into pairs of letters (digraphs). If a pair has the same letters or the message has an odd number of letters, insert 'X'.</li>
                <li>For each pair, locate the letters in the grid and apply the following rules:
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>If in the same row: use letters to the right (wrapping around)</li>
                    <li>If in the same column: use letters below (wrapping around)</li>
                    <li>If in different rows and columns: form a rectangle and use the letters on the same row at the opposite corners</li>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p className="mb-2">Key: MONARCHY, Plaintext: HELLO WORLD</p>
              <div className="grid grid-cols-5 gap-1 mb-4 place-items-center">
                {['M','O','N','A','R','C','H','Y','B','D','E','F','G','I/J','K','L','P','Q','S','T','U','V','W','X','Z'].map((char, i) => (
                  <div key={i} className="w-8 h-8 bg-white rounded flex items-center justify-center font-mono">
                    {char}
                  </div>
                ))}
              </div>
              <p className="mb-2">Encryption process:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>HE → DM</li>
                <li>LX → RO</li>
                <li>LO → IV</li>
                <li>WO → UV</li>
                <li>RL → TG</li>
                <li>DX → CP</li>
              </ul>
              <p className="mt-2">Ciphertext: DMROIVUVTGCP</p>
            </div>
          </div>  
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
                onClick={() => {
                  setMode('encrypt')
                  setOutput('')
                  setSteps([])
                }}
                variant={mode === 'encrypt' ? 'default' : 'outline'}
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                Encrypt
              </Button>
              <Button
                onClick={() => {
                  setMode('decrypt')
                  setOutput('')
                  setSteps([])
                }}
                variant={mode === 'decrypt' ? 'default' : 'outline'}
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Decrypt
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="key-text" className="block text-sm font-medium mb-2">Key text:</label>
            <Input
              id="key-text"
              value={keyText}
              onChange={(e) => setKeyText(e.target.value)}
              placeholder="Enter key text..."
            />
          </div>

          <div className="mb-4">
            <label htmlFor="input-text" className="block text-sm font-medium mb-2">
              Enter {mode === 'encrypt' ? 'plaintext' : 'ciphertext'}:
            </label>
            <textarea
              id="input-text"
              className="w-full p-3 border rounded-md"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter text to ${mode}...`}
              rows={3}
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <Button onClick={handleOperation}>
              <Play className="mr-2 h-4 w-4" />
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
            <Button
              onClick={() => {
                setInputText('HELLO WORLD')
                setKeyText('MONARCHY')
                setOutput('')
                setSteps([])
                setShowBreakdown(false)
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

          {grid.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Playfair Grid:</label>
              <div className="bg-blue-50 p-4 rounded-md flex-justify-center">
                <div className="grid grid-cols-5 gap-1 place-items-center">
                  {grid.flat().map((char, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 bg-white p-4 rounded-md rounded flex items-center justify-center font-mono"
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showBreakdown && steps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Step-by-Step {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</span>
              <Button
                onClick={() => setShowBreakdown(false)}
                variant="ghost"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground">{steps[currentStep].description}</p>
            </div>

            <div className="bg-muted p-8 rounded-lg mb-6 flex-justify-center">
              <div className="grid grid-cols-5 gap-2 place-items-center">
                  {steps[currentStep].visualization.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const isHighlightInput = cell.replace(/[\[\]]/g, '') === steps[currentStep].highlightPair[0][0] ||
                                              cell.replace(/[\[\]]/g, '') === steps[currentStep].highlightPair[0][1];
                      const isHighlightOutput = cell.replace(/[\[\]]/g, '') === steps[currentStep].highlightPair[1][0] ||
                                                cell.replace(/[\[\]]/g, '') === steps[currentStep].highlightPair[1][1];

                      return (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md font-mono text-lg
                            ${cell.startsWith('[') ? 'bg-primary text-primary-foreground' :
                            isHighlightInput ? 'bg-blue-200 text-blue-800' :
                            isHighlightOutput ? 'bg-green-200 text-green-800' :
                            'bg-background text-foreground'}`}
                        >
                          {cell.replace(/[\[\]]/g, '')}
                        </div>
                      );
                    })
                  )}
                </div>
            </div>

            {steps[currentStep].highlightPair[0] && (
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="bg-blue-100 text-blue-800 p-2 rounded-md font-mono">
                  {steps[currentStep].highlightPair[0]}
                </div>
                <ArrowRight className="text-gray-500" />
                <div className="bg-green-100 text-green-800 p-2 rounded-md font-mono">
                  {steps[currentStep].highlightPair[1]}
                </div>
              </div>
            )}

            {steps[currentStep].result && (
              <div className="bg-muted p-4 rounded-md mb-6">
                <p className="font-mono">Current result: {steps[currentStep].result}</p>
              </div>
            )}

            <div className="bg-muted p-4 rounded-md mb-6">
              <p className="text-foreground font-mono">{steps[currentStep].detail}</p>
            </div>

            <div className="flex items-center justify-between">
            <Button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              variant="outline"
              size="icon"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
              >
                {isPlaying ? (
                  <>
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Play
                  </>
                )}
              </Button>
              <Button
                onClick={() => setCurrentStep(0)}
                variant="outline"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              variant="outline"
              size="icon"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          </CardContent>
        </Card>
      )}

<Card>
  <CardHeader>
    <CardTitle className="flex items-center">
      <History className="mr-2 text-primary" />
      Security Level
      <span className="ml-2 relative group flex items-center">
        {/* Image icon */}
        <img src={infoIcon} alt="Info" className="w-4 h-4 cursor-pointer" />
        
        {/* Tooltip */}
        <div className="absolute hidden group-hover:flex bg-gray-700 text-white text-xs rounded px-2 py-1 top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mt-2 w-max">
          <span className="flex items-center whitespace-nowrap">
            Security Level refers to the difficulty of decrypting the cipher method
          </span>
        </div>
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <h3 className="font-semibold mb-2">Security Level: Moderate</h3>
    <div className="flex items-center mb-4">
      <div className="h-2 w-24 bg-yellow-500 rounded-full" />
      <div className="h-2 w-24 bg-yellow-500 rounded-full ml-1" />
      <div className="h-2 w-24 bg-muted rounded-full ml-1" />
    </div>
    <p className="text-sm text-muted-foreground">
      The Playfair cipher was used for tactical purposes in both World Wars. 
      While more secure than simple substitution ciphers, it's not suitable 
      for modern cryptographic needs. It can be broken with frequency analysis 
      of digraphs (letter pairs) instead of single letters.
    </p>
  </CardContent>
</Card>
    </TabsContent>
  )
}

export default PlayfairCipherTab