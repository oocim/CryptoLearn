import React, { useState, useEffect } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Play, RotateCcw, History, Lock, ArrowUp, ArrowDown, BookOpen, ChevronLeft, ChevronRight, KeyRound, PlayCircle, PauseCircle, X } from 'lucide-react'

interface Step {
  title: string;
  description: string;
  visualization: string[][];
  result: string;
  detail: string;
}

const RailFenceCipherTab = () => {
  const [inputText, setInputText] = useState('HELLO WORLD')
  const [rails, setRails] = useState(3)
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<Step[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const railFenceCipher = (text: string, railCount: number, isDecrypt: boolean = false): string => {
    const cleanText = text.replace(/\s/g, '').toUpperCase()
    if (railCount < 2 || railCount >= cleanText.length) return cleanText

    if (!isDecrypt) {
      // Encryption
      const fence: string[][] = Array(railCount).fill(null).map(() => [])
      let rail = 0
      let direction = 1

      for (let char of cleanText) {
        fence[rail].push(char)
        rail += direction
        if (rail === 0 || rail === railCount - 1) direction *= -1
      }

      return fence.flat().join('')
    } else {
      // Decryption
      const fence: string[][] = Array(railCount).fill(null).map(() => Array(cleanText.length).fill(''))
      let rail = 0
      let direction = 1

      for (let i = 0; i < cleanText.length; i++) {
        fence[rail][i] = 'x'
        rail += direction
        if (rail === 0 || rail === railCount - 1) direction *= -1
      }

      let index = 0
      for (let i = 0; i < railCount; i++) {
        for (let j = 0; j < cleanText.length; j++) {
          if (fence[i][j] === 'x') fence[i][j] = cleanText[index++]
        }
      }

      rail = 0
      direction = 1
      let result = ''
      for (let i = 0; i < cleanText.length; i++) {
        result += fence[rail][i]
        rail += direction
        if (rail === 0 || rail === railCount - 1) direction *= -1
      }

      return result
    }
  }

  const generateSteps = (text: string, railCount: number, isEncrypting: boolean): Step[] => {
    const cleanText = text.replace(/\s/g, '').toUpperCase()
    if (railCount < 2 || railCount >= cleanText.length) return []

    let steps: Step[] = [{
      title: "Initial Setup",
      description: `${isEncrypting ? 'Plaintext' : 'Ciphertext'}: "${cleanText}" with ${railCount} rails`,
      visualization: Array(railCount).fill(null).map(() => Array(cleanText.length).fill('.')),
      result: '',
      detail: `We'll arrange the text in a zigzag pattern across ${railCount} rails`
    }]

    if (isEncrypting) {
      let fence: string[][] = Array(railCount).fill(null).map(() => Array(cleanText.length).fill('.'))
      let rail = 0
      let direction = 1

      for (let i = 0; i < cleanText.length; i++) {
        fence[rail][i] = cleanText[i]
        steps.push({
          title: `Step ${i + 1}: Adding "${cleanText[i]}"`,
          description: `Place "${cleanText[i]}" on rail ${rail + 1}`,
          visualization: fence.map(row => [...row]),
          result: '',
          detail: `Moving ${direction > 0 ? 'down' : 'up'} in the zigzag pattern`
        })

        rail += direction
        if (rail === 0 || rail === railCount - 1) direction *= -1
      }

      const result = fence.flat().filter(char => char !== '.').join('')
      steps.push({
        title: "Final Step: Reading the Cipher",
        description: "Read off the letters rail by rail",
        visualization: fence,
        result,
        detail: `Final ciphertext: ${result}`
      })
    } else {
      // Decryption steps
      let fence: string[][] = Array(railCount).fill(null).map(() => Array(cleanText.length).fill('_'))
      let rail = 0
      let direction = 1

      // Mark positions
      for (let i = 0; i < cleanText.length; i++) {
        fence[rail][i] = 'x'
        rail += direction
        if (rail === 0 || rail === railCount - 1) direction *= -1
      }

      steps.push({
        title: "Step 1: Marking Positions",
        description: "Mark the positions where letters will be placed",
        visualization: fence.map(row => [...row]),
        result: '',
        detail: "The 'x' marks show where letters from the ciphertext will be placed"
      })

      // Fill in the letters
      let index = 0
      for (let i = 0; i < railCount; i++) {
        for (let j = 0; j < cleanText.length; j++) {
          if (fence[i][j] === 'x') {
            fence[i][j] = cleanText[index++]
            steps.push({
              title: `Step ${index}: Filling in "${cleanText[index - 1]}"`,
              description: `Place "${cleanText[index - 1]}" on rail ${i + 1}`,
              visualization: fence.map(row => [...row]),
              result: '',
              detail: `Filling the marked positions with letters from the ciphertext`
            })
          }
        }
      }

      // Read off the plaintext
      rail = 0
      direction = 1
      let result = ''
      for (let i = 0; i < cleanText.length; i++) {
        result += fence[rail][i]
        rail += direction
        if (rail === 0 || rail === railCount - 1) direction *= -1
      }

      steps.push({
        title: "Final Step: Reading the Plaintext",
        description: "Read off the letters in zigzag pattern",
        visualization: fence.map(row => [...row]),
        result,
        detail: `Final plaintext: ${result}`
      })
    }

    return steps
  }

  const handleOperation = () => {
    const result = railFenceCipher(inputText, rails, mode === 'decrypt')
    setOutput(result)
    const newSteps = generateSteps(inputText, rails, mode === 'encrypt')
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
    <TabsContent value="rail-fence-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <KeyRound className="mr-2 text-primary" />
            Rail Fence Cipher
          </CardTitle>
          <CardDescription>A transposition cipher that arranges the plaintext in a zigzag pattern across several "rails" of an imaginary fence.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The Rail Fence cipher is simple to implement but can be combined with other ciphers for added complexity.</p>
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
            <label htmlFor="rails" className="block text-sm font-medium mb-2">Number of rails (2-5):</label>
            <Input
               id="rails"
                type="number"
                min="2"
                max="10"
                value={rails}
                onChange={(e) => setRails(parseInt(e.target.value, 10))}
                className="w-24"
              />
              {rails > 5 && (
                <p className="text-sm text-yellow-600 mt-2">
                  Note: Using more than 5 rails may make the visualization difficult to read on smaller screens.
                </p>
              )}
          </div>

          <div className="flex space-x-4 mb-4">
            <Button onClick={handleOperation}>
              <Play className="mr-2 h-4 w-4" />
              {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </Button>
            <Button
              onClick={() => {
                setInputText('HELLO WORLD')
                setRails(3)
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
            <div className="grid grid-cols-1 gap-2">
                {steps[currentStep].visualization.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center">
                    {row.map((char, colIndex) => (
                      <div
                        key={colIndex}
                        className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md font-mono text-lg
                          ${char !== '.' && char !== '_' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}`}
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {steps[currentStep].result && (
              <div className="bg-muted p-4 rounded-md mb-6">
                <p className="font-mono">{steps[currentStep].result}</p>
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
            <BookOpen className="mr-2 text-primary" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The Rail Fence cipher works by writing the plaintext in a zigzag pattern 
            across a number of "rails" and then reading off each rail to form the ciphertext. 
            For decryption, the process is reversed.
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Example:</h3>
            <p>With 3 rails and the plaintext "HELLO WORLD":</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {[
                ['H', '.', '.', '.', 'O', '.', '.', '.', 'R', '.', '.'],
                ['.', 'E', '.', 'L', '.', 'W', '.', 'L', '.', 'D', '.'],
                ['.', '.', 'L', '.', '.', '.', 'O', '.', '.', '.', '.']
              ].map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center">
                  {row.map((char, colIndex) => (
                    <div
                      key={colIndex}
                      className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md font-mono text-lg
                        ${char !== '.' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'}`}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-4">Ciphertext: HORELWLOLD</p>
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
            The Rail Fence cipher is relatively easy to break, especially for short messages 
            or when the number of rails is known. It's primarily used for educational purposes 
            and should not be relied upon for secure communication.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default RailFenceCipherTab