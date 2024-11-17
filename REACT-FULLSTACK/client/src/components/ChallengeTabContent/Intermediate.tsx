import { Challenge, ChallengeCard } from '../Challenges'

const intermediateChallenges: Challenge[] = [
  {
    id: 3,
    title: "Vigenère Cipher",
    description: "Decrypt this message using the Vigenère cipher. The key is a common three-letter word.",
    ciphertext: "LXFOPVEFRNHR",
    plaintext: "CRYPTOGRAPHY",
    points: 250,
    timeLimit: "15:00",
    hint: "Try common three-letter words as keys, like 'THE' or 'AND'",
    type: "Vigenère",
    completed: false,
  },
  {
    id: 4,
    title: "Playfair Challenge",
    description: "Decode this message encrypted with the Playfair cipher. The key phrase is 'MONARCHY'.",
    ciphertext: "BMODZBXDNABEKUDMUIXMMOUVIF",
    plaintext: "DEFENDTHEEASTWALLOFTHECASTLE",
    points: 300,
    timeLimit: "20:00",
    hint: "Remember to handle 'J' as 'I' and use 'X' as a filler letter",
    type: "Playfair",
    completed: false,
  },
]

interface IntermediateChallengesProps {
  activeChallengeId: number | null
  setActiveChallengeId: (id: number | null) => void
  onSubmit: (answer: string) => void
}

export default function IntermediateChallenges({ activeChallengeId, setActiveChallengeId, onSubmit }: IntermediateChallengesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {intermediateChallenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          isActive={activeChallengeId === challenge.id}
          onActivate={() => setActiveChallengeId(challenge.id)}
          onSubmit={onSubmit}
        />
      ))}
    </div>
  )
}