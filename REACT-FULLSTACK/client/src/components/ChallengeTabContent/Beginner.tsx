import { Challenge, ChallengeCard } from '../Challenges'

const beginnerChallenges: Challenge[] = [
  {
    id: 1,
    title: "Caesar's Message",
    description: "Decode this message encrypted with a Caesar cipher (shift: 3)",
    ciphertext: "ZHOFRPH WR FUBSWROHDUQ",
    plaintext: "WELCOME TO CRYPTOLEARN",
    points: 100,
    timeLimit: "5:00",
    hint: "Try shifting each letter back by 3 positions",
    type: "Caesar",
    completed: false,
  },
  {
    id: 2,
    title: "Simple Substitution Start",
    description: "Break this simple substitution cipher. Common words: THE, AND, IS",
    ciphertext: "XYZ ABC QRS",
    plaintext: "THE AND IS",
    points: 150,
    timeLimit: "10:00",
    hint: "Look for common three-letter words",
    type: "Substitution",
    completed: false,
  },
]

interface BeginnerChallengesProps {
  activeChallengeId: number | null
  setActiveChallengeId: (id: number | null) => void
  onSubmit: (answer: string) => void
}

export default function BeginnerChallenges({ activeChallengeId, setActiveChallengeId, onSubmit }: BeginnerChallengesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {beginnerChallenges.map((challenge) => (
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