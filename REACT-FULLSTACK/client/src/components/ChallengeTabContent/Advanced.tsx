import { Challenge, ChallengeCard } from '../Challenges'

const advancedChallenges: Challenge[] = [
  {
    challengeId: 5,
    title: "Hill Cipher",
    description: "Decrypt this message encrypted with a 2x2 Hill cipher. The key matrix is [[2, 1], [3, 4]].",
    ciphertext: "PQCFKU",
    plaintext: "SECRET",
    points: 400,
    timeLimit: "25:00",
    hint: "Remember to use modular arithmetic with mod 26",
    cipherType: "Hill",
    completed: false,
  },
  {
    challengeId: 6,
    title: "One-Time Pad",
    description: "Given the ciphertext and the one-time pad key, recover the plaintext message.",
    ciphertext: "0E071D150B",
    plaintext: "CRYPTO",
    points: 500,
    timeLimit: "30:00",
    hint: "The key is '0A0F08040D'. XOR each byte of the ciphertext with the corresponding key byte",
    cipherType: "One-Time Pad",
    completed: false,
  },
]

interface AdvancedChallengesProps {
  activeChallengeId: number | null
  setActiveChallengeId: (id: number | null) => void
  onSubmit: (answer: string) => void
}

export default function AdvancedChallenges({ activeChallengeId, setActiveChallengeId, onSubmit }: AdvancedChallengesProps) {
  console.log(advancedChallenges);
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {advancedChallenges.map((challenge) => (
        <ChallengeCard
          key={challenge.challengeId}
          challenge={challenge}
          isActive={activeChallengeId === challenge.challengeId}
          onActivate={() => setActiveChallengeId(challenge.challengeId)}
          onSubmit={onSubmit}
        />
      ))}
    </div>
  )
}