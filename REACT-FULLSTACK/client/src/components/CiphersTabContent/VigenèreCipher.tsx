import React, { useState, useEffect } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Play, RotateCcw, History, Lock, ArrowUp, ArrowDown, BookOpen, ChevronLeft, ChevronRight, Grid, PlayCircle, PauseCircle, X } from 'lucide-react'

const VigenereCipherTab = () => {
  const [inputText, setInputText] = useState('HELLO')
  const [keyword, setKeyword] = useState('KEY')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<any[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const processVigenere = (text: string, key: string, isEncrypting = true) => {
    const normalizedText = text.toUpperCase().replace(/[^A-Z]/g, '')
    const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '')
    
    if (!normalizedText || !normalizedKey) return ''
    
    return normalizedText
      .split('')
      .map((char, i) => {
        const shift = normalizedKey[i % normalizedKey.length].charCodeAt(0) - 65
        const charCode = char.charCodeAt(0) - 65
        
        const newCode = isEncrypting
          ? ((charCode + shift) % 26)
          : ((charCode - shift + 26) % 26)
          
        return String.fromCharCode(newCode + 65)
      })
      .join('')
  }

  const generateSteps = (text: string, key: string, isEncrypting: boolean) => {
    const normalizedText = text.toUpperCase().replace(/[^A-Z]/g, '');
    const normalizedKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
    if (!normalizedText || !normalizedKey) return [];
  
    let steps = [{
        title: "Initial Setup",
        description: `${isEncrypting ? 'Plaintext' : 'Ciphertext'}: "${normalizedText}" with keyword: "${normalizedKey}"`,
        text: normalizedText.split(''),
        keyword: normalizedKey.split(''),
        result: [] as string[],
        currentIndex: -1,
        detail: `Each letter will be ${isEncrypting ? 'shifted forward' : 'shifted backward'} based on the position of the corresponding keyword letter in the alphabet.`
    }];
  
    let result: string[] = [];
    for (let i = 0; i < normalizedText.length; i++) {
        const char = normalizedText[i];
        const keyChar = normalizedKey[i % normalizedKey.length];
        const shift = keyChar.charCodeAt(0) - 65; // Position of keyChar in alphabet (0-based index)
        const charCode = char.charCodeAt(0) - 65; // Position of char in alphabet (0-based index)
  
        const newCode = isEncrypting
            ? ((charCode + shift) % 26) // Forward shift
            : ((charCode - shift + 26) % 26); // Backward shift
        const newChar = String.fromCharCode(newCode + 65); // Convert back to letter
  
        result = [...result, newChar];
  
        const operation = isEncrypting
            ? `${char} + ${shift} = ${newChar}`
            : `${char} - ${shift} = ${newChar}`;
  
        const explanation = `(The letter "${char}" (${charCode}) is combined with "${keyChar}" (${shift}) to produce "${newChar}" (${newCode}).)`;
  
        steps.push({
            title: `Step ${i + 1}: ${isEncrypting ? 'Encrypting' : 'Decrypting'} "${char}" with "${keyChar}"`,
            description: `${operation} (based on the alphabet position of "${keyChar}").`,
            text: normalizedText.split(''),
            keyword: normalizedKey.split(''),
            result: [...result],
            currentIndex: i,
            detail: `${operation}. ${explanation}`
        });
    }
  
    return steps;
};


  const handleProcess = () => {
    const result = processVigenere(inputText, keyword, mode === 'encrypt')
    setOutput(result)
    const newSteps = generateSteps(inputText, keyword, mode === 'encrypt')
    setSteps(newSteps)
    setCurrentStep(0)
    setShowBreakdown(true)
  }

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1)
      }, 1000)
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, steps.length])

  return (
    <TabsContent value="vigenère-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Grid className="mr-2 text-primary" />
            Vigenère Cipher
          </CardTitle>
          <CardDescription>
            16th century polyalphabetic substitution cipher
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            It remained unbroken for 300 years and was known as "le chiffre indéchiffrable" (the unbreakable cipher).
          </p>
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
                  The Vigenère cipher is a polyalphabetic substitution cipher that uses a keyword
                  to encrypt and decrypt text. Here's how it works:
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Encryption:</h3>
                  <p>Each letter in the plaintext is shifted forward based on the corresponding letter in the keyword.</p>
                  <div className="font-mono mt-2">
                    Example with keyword "KEY":<br />
                    K shifts by 10 (K is 10th letter)<br />
                    E shifts by 4 (E is 4th letter)<br />
                    Y shifts by 24 (Y is 24th letter)
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Decryption:</h3>
                  <p>Each letter in the ciphertext is shifted backward using the same keyword pattern.</p>
                  <div className="font-mono mt-2">
                    Example with keyword "KEY":<br />
                    K shifts back by 10<br />
                    E shifts back by 4<br />
                    Y shifts back by 24
                  </div>
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
            <label className="block text-sm font-medium mb-2">Keyword:</label>
            <Input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.replace(/[^A-Za-z]/g, ''))}
              placeholder="Enter keyword (letters only)"
            />
          </div>

          <div className="flex space-x-4 mb-4">
            <Button onClick={handleProcess} disabled={!inputText || !keyword}>
              <Play className="mr-2 h-4 w-4" />
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
            <Button
              onClick={() => {
                setInputText('')
                setKeyword('KEY')
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
              <label className="block text-sm font-medium mb-2">
                {mode === 'encrypt' ? 'Ciphertext:' : 'Plaintext:'}
              </label>
              <div className="font-mono break-all">{output}</div>
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

            <div className="bg-muted p-8 rounded-lg mb-6">
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium mb-2">
                    {mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
                  </span>
                  <div className="flex space-x-4">
                    {steps[currentStep].text.map((char: string, i: number) => (
                      <div
                        key={`text-${i}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-md font-mono text-lg
                          ${i === steps[currentStep].currentIndex ? 'bg-primary text-primary-foreground font-bold' : 'bg-background'}`}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium mb-2">Keyword (repeated)</span>
                  <div className="flex space-x-4">
                    {steps[currentStep].text.map((_: any, i: number) => (
                      <div
                        key={`key-${i}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-md font-mono text-lg
                          ${i === steps[currentStep].currentIndex ? 'bg-secondary text-secondary-foreground font-bold' : 'bg-background'}`}
                      >
                        {steps[currentStep].keyword[i % steps[currentStep].keyword.length]}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium mb-2">
                    {mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'}
                  </span>
                  <div className="flex space-x-4">
                    {steps[currentStep].text.map((_: any, i: number) => (
                      <div
                        key={`result-${i}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-md font-mono text-lg
                          ${i === steps[currentStep].currentIndex ? 'bg-accent text-accent-foreground font-bold' : 'bg-background'}`}
                      >
                        {steps[currentStep].result[i] || ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
          The Vigenère cipher is more secure than the Caesar cipher but can still be broken with frequency analysis on longer texts.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default VigenereCipherTab