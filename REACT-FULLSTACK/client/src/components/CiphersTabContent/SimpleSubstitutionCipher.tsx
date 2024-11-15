import React, { useState } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Play, RotateCcw, BookOpen, Lock, History, Shuffle, ArrowDown, ArrowUp, Fingerprint, ArrowRight } from 'lucide-react'

const SimpleSubstitutionCipherTab = () => {
  const [inputText, setInputText] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
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

  const processText = (text: string, isDecrypt = false) => {
    const key = isDecrypt ? getDecryptionKey(substitutionKey) : substitutionKey
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        if (char.match(/[A-Z]/)) {
          return key[char] || char
        }
        return char
      })
      .join('')
  }

  const handleOperation = () => {
    const result = processText(inputText, mode === 'decrypt')
    setOutput(result)
  }

    // Group letters into sets of 5 for better readability
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
            The Simple Substitution Cipher creates a one-to-one mapping between letters. 
            Each letter in the plaintext is replaced with its corresponding letter in 
            the cipher alphabet. For decryption, we simply reverse the mapping.
          </p>
          <div className="bg-muted p-4 rounded-md">
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
            While stronger than the Caesar cipher, it can be broken using frequency 
            analysis. Not suitable for serious encryption needs.
          </p>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default SimpleSubstitutionCipherTab