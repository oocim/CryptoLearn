import React, { useState, useEffect } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Play, RotateCcw, History, Lock, ArrowUp, ArrowDown, BookOpen, ChevronLeft, ChevronRight, KeyRound, PlayCircle, PauseCircle, X } from 'lucide-react'

// Define Step interface without highlightIndex and highlightShiftedIndex
interface Step {
  title: string;
  description: string;
  text: string[];
  result: string[];
  currentIndex: number;
  detail: string;
}

const CaesarCipherTab = () => {
  const [inputText, setInputText] = useState('HELLO')
  const [shift, setShift] = useState(3)
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<Step[]>([]) // Updated steps type
  const [isPlaying, setIsPlaying] = useState(false)

  const caesarCipher = (text: string, shift: number, isDecrypt: boolean = false): string => {
    const actualShift = (isDecrypt ? -1 : 1) * (shift % 26)
    
    return text
      .toUpperCase()
      .split('')
      .map((char: string) => {
        if (char.match(/[A-Z]/)) {
          let code = char.charCodeAt(0) - 65 + actualShift
          code = ((code % 26) + 26) % 26
          return String.fromCharCode(code + 65)
        }
        return char
      })
      .join('')
  }

  const generateSteps = (text: string, shift: number, isEncrypting: boolean): Step[] => {
    const normalizedText = text.toUpperCase().replace(/[^A-Z]/g, '')
    
    if (!normalizedText) return []
  
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let steps: Step[] = [{
      title: "Initial Setup",
      description: `${isEncrypting ? 'Plaintext' : 'Ciphertext'}: "${normalizedText}" with shift: ${shift}`,
      text: normalizedText.split(''),
      result: [] as string[],
      currentIndex: -1,
      detail: `Each letter will be ${isEncrypting ? 'shifted forward' : 'shifted backward'} by ${shift} positions`
    }]
  
    let result: string[] = []

    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i]
      const charIndex = alphabet.indexOf(char)
      const newChar = isEncrypting ? alphabet[(charIndex + shift) % 26] : alphabet[(charIndex - shift + 26) % 26]
  
      result = [...result, newChar]
  
      const operation = isEncrypting 
        ? `${char} + ${shift} = ${newChar}`
        : `${char} - ${shift} = ${newChar}`
  
      steps.push({
        title: `Step ${i + 1}: ${isEncrypting ? 'Encrypting' : 'Decrypting'} "${char}"`,
        description: `${isEncrypting ? 'Shift forward' : 'Shift backward'} by ${shift} positions`,
        text: normalizedText.split(''),
        result: [...result],
        currentIndex: i,
        detail: `${operation} (${char} is at position ${charIndex + 1}, which maps to ${newChar} at position ${isEncrypting ? (charIndex + shift) % 26 + 1 : (charIndex - shift + 26) % 26 + 1})`
      })
    }
  
    return steps
  }

  const handleOperation = () => {
    const result = caesarCipher(inputText, shift, mode === 'decrypt')
    setOutput(result)
    const newSteps = generateSteps(inputText, shift, mode === 'encrypt')
    setSteps(newSteps)
    setCurrentStep(0)
    setShowBreakdown(true)
  }

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prevStep) => prevStep + 1)
      }, 2000)
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, steps.length])

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
            <BookOpen className="mr-2 text-primary" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              The Caesar cipher is a substitution cipher that shifts each letter in the 
              text by a fixed number of positions in the alphabet. For decryption, 
              we simply shift in the opposite direction.<br /> Example: With a shift of 3:
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Encryption:</h3>
                  <p>Each letter in the plaintext is shifted 3 times forward.</p>
                  <div className="font-mono mt-2">
                  A → D<br />
                  B → E<br />
                  C → F<br />
                  </div>
                </div>

            <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Decryption:</h3>
                <p>Each letter in the ciphertext is shifted 3 times backward.</p>
                <div className="font-mono mt-2">
                D → A<br />
                E → B<br />
                F → C
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

          <div className="mb-4">
            <label htmlFor="shift-key" className="block text-sm font-medium mb-2">Shift key (1-25):</label>
            <Input
              id="shift-key"
              type="number"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
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
                setInputText('HELLO')
                setShift(3)
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
    <div className="flex flex-col space-y-4">
      <div className="flex justify-center space-x-2">
        {steps[currentStep].text.map((char: string, i: number) => (
          <div
            key={`text-${i}`}
            className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-lg
              ${i === steps[currentStep].currentIndex ? 'bg-primary text-primary-foreground font-bold' : 'bg-background'}`}
          >
            {char}
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {steps[currentStep].result.map((char: string, i: number) => (
          <div
            key={`result-${i}`}
            className={`w-8 h-8 flex items-center justify-center rounded-md font-mono text-lg
              ${i === steps[currentStep].currentIndex ? 'bg-accent text-accent-foreground font-bold' : 'bg-background'}`}
          >
            {char || ''}
          </div>
        ))}
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
  )
}

export default CaesarCipherTab