import { Info } from 'lucide-react'

export default function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About CryptoLearn</h1>
      <p className="text-lg">CryptoLearn is an interactive platform for learning about classical cryptography.</p>
      <Info className="h-12 w-12 text-primary" />
    </div>
  )
}