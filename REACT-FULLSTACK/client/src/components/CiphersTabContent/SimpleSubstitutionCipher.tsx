import React, { useState, useEffect } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Play, RotateCcw, BookOpen, Lock, History, Shuffle, ArrowDown, ArrowUp, 
  Fingerprint, ArrowRight, ChevronLeft, ChevronRight, PlayCircle, PauseCircle, X } from 'lucide-react'
  import infoIcon from './i.png';

// Define Step interface
interface Step {
  title: string;
  description: string;
  text: string[];
  result: string[];
  currentIndex: number;
  detail: string;
  substitution?: {
    from: string;
    to: string;
  };
}

const SimpleSubstitutionCipherTab = () => {
  const [inputText, setInputText] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [substitutionKey, setSubstitutionKey] = useState<Record<string, string>>({
    A: 'Q', B: 'W', C: 'E', D: 'R', E: 'T', 
    F: 'Y', G: 'U', H: 'I', I: 'O', J: 'P',
    K: 'A', L: 'S', M: 'D', N: 'F', O: 'G', 
    P: 'H', Q: 'J', R: 'K', S: 'L', T: 'Z',
    U: 'X', V: 'C', W: 'V', X: 'B', Y: 'N', 
    Z: 'M'
  })

  const getDecryptionKey = (encryptionKey: Record<string, string>) => {
    const decryptionKey: Record<string, string> = {}
    Object.entries(encryptionKey).forEach(([plain, cipher]) => {
      decryptionKey[cipher] = plain
    })
    return decryptionKey
  }

  const generateRandomKey = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const shuffled = [...alphabet].sort(() => Math.random() - 0.5)
    const newKey: Record<string, string> = {}
    alphabet.forEach((letter, index) => {
      newKey[letter] = shuffled[index]
    })
    setSubstitutionKey(newKey)
  }

  const generateSteps = (text: string, key: Record<string, string>, isDecrypt: boolean): Step[] => {
    const normalizedText = text.toUpperCase();
    const steps: Step[] = [{
      title: "Initial Setup",
      description: `${isDecrypt ? 'Ciphertext' : 'Plaintext'}: "${normalizedText}"`,
      text: normalizedText.split(''),
      result: [],
      currentIndex: -1,
      detail: `In our key, each character maps to its substituted character based on ${isDecrypt ? 'decryption' : 'encryption'} mapping.`
    }];
  
    let result: string[] = [];
    
    normalizedText.split('').forEach((char, index) => {
      if (char.match(/[A-Z]/)) {
        const substitutedChar = key[char] || char;
        result = [...result, substitutedChar];
  
        steps.push({
          title: `Step ${index + 1}: Substituting "${char}"`,
          description: `${char} → ${substitutedChar}`,
          text: normalizedText.split(''),
          result: [...result],
          currentIndex: index,
          detail: `Using the ${isDecrypt ? 'decryption' : 'encryption'} key mapping. ${char} maps to ${substitutedChar}`,
          substitution: {
            from: char,
            to: substitutedChar
          }
        });
      } else {
        result = [...result, char];
      }
    });
  
    return steps;
  };
  

  const processText = (text: string, isDecrypt = false) => {
    const key = isDecrypt ? getDecryptionKey(substitutionKey) : substitutionKey
    return text
      .toUpperCase()
      .split('')
      .map(char => char.match(/[A-Z]/) ? key[char] || char : char)
      .join('')
  }

  const handleOperation = () => {
    const key = mode === 'decrypt' ? getDecryptionKey(substitutionKey) : substitutionKey
    const result = processText(inputText, mode === 'decrypt')
    setOutput(result)
    const newSteps = generateSteps(inputText, key, mode === 'decrypt')
    setSteps(newSteps)
    setCurrentStep(0)
    setShowBreakdown(true)
  }

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1)
      }, 2000)
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, steps.length])

  const groupedEntries = Object.entries(substitutionKey).reduce((acc, entry, index) => {
    const groupIndex = Math.floor(index / 10)
    if (!acc[groupIndex]) acc[groupIndex] = []
    acc[groupIndex].push(entry)
    return acc
  }, [] as [string, string][][])

  return (
    <TabsContent value="simple-substitution-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fingerprint className="mr-2 text-primary" />
            Simple Substitution Cipher
          </CardTitle>
          <CardDescription>
            A classical cryptographic method using letter-to-letter mapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Each letter is uniquely replaced, making frequency analysis a key method for breaking it.
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
          <p className="mb-4">
            The Simple Substitution Cipher creates a one-to-one mapping between letters. 
            Each letter in the plaintext is replaced with its corresponding letter in 
            the cipher alphabet. For decryption, we simply reverse the mapping.
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Bidirectional mapping (each letter has a unique pair)</li>
              <li>26! possible different keys</li>
              <li>Preserves letter frequency patterns</li>
              <li>Spaces and punctuation remain unchanged</li>
            </ul>
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
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Substitution Key:</label>
              <Button
                onClick={generateRandomKey}
                variant="outline"
                size="sm"
                className="text-sm"
              >
                <Shuffle className="h-4 w-4 mr-1" />
                Generate Random Key
              </Button>
            </div>
            <div className="flex min-w-max flex-col space-y-3">
              {groupedEntries.map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center">
                  {group.map(([plaintext, ciphertext], index) => (
                    <React.Fragment key={plaintext}>
                      <div className="flex items-center bg-background rounded-md px-3 py-1.5">
                        <div className="font-mono text-base font-medium w-6 text-center">{plaintext}</div>
                        <ArrowRight className="mx-2 h-4 w-4 text-primary" />
                        <div className="font-mono text-base font-medium w-6 text-center">{ciphertext}</div>
                      </div>
                      {index < group.length - 1 && (
                        <div className="mx-3 h-6 w-px bg-border" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))}
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

          <div className="flex space-x-4 mb-4">
            <Button onClick={handleOperation}>
              <Play className="mr-2 h-4 w-4" />
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
            <Button
              onClick={() => {
                setInputText('')
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
                  {steps[currentStep].text.map((char, i) => (
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
                  {steps[currentStep].result.map((char, i) => (
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

            {steps[currentStep].substitution && (
              <div className="bg-accent/10 p-4 rounded-md mb-6 flex items-center justify-center space-x-4">
                <span className="font-mono text-2xl">{steps[currentStep].substitution.from}</span>
                <ArrowRight className="h-6 w-6 text-primary" />
                <span className="font-mono text-2xl text-primary">
                  {steps[currentStep].substitution.to}
                </span>
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
      While stronger than the Caesar cipher, it can be broken using frequency 
      analysis. Not suitable for serious encryption needs.
    </p>
  </CardContent>
</Card>
    </TabsContent>
  )
}

export default SimpleSubstitutionCipherTab