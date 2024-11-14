import { Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export default function Ciphers() {
  const ciphers = [
    { name: 'Caesar Cipher', desc: 'Learn the classic shift cipher' },
    { name: 'Vigenère Cipher', desc: 'Master polyalphabetic substitution' },
    { name: 'Substitution Cipher', desc: 'Explore simple substitution' }
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cipher Library</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ciphers.map((cipher) => (
          <Card key={cipher.name}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-4 w-4" />
                {cipher.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{cipher.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}