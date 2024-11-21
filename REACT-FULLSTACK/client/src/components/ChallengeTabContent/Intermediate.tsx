import { useEffect, useState } from 'react';
import { Challenge, ChallengeCard } from '../Challenges';

export const fetchIntermediateChallenges = async (): Promise<Challenge[]> => {
  try {
    const response = await fetch("http://localhost:3000/challenges?category=Intermediate");
    if (!response.ok) {
      throw new Error('Failed to fetch challenges');
    }
    const data: Challenge[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching intermediate challenges:', error);
    return [];
  }
};

interface IntermediateChallengesProps {
  activeChallengeId: number | null;
  setActiveChallengeId: (id: number | null) => void;
  onSubmit: (answer: string) => void;
}

export default function IntermediateChallenges({ activeChallengeId, setActiveChallengeId, onSubmit }: IntermediateChallengesProps) {
  const [intermediateChallenges, setIntermediateChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const loadChallenges = async () => {
      const challenges = await fetchIntermediateChallenges();
      setIntermediateChallenges(challenges);
    };
    loadChallenges();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {intermediateChallenges.map((challenge) => (
        <ChallengeCard
          key={challenge.challengeId}
          challenge={challenge}
          isActive={activeChallengeId === challenge.challengeId}
          onActivate={() => setActiveChallengeId(challenge.challengeId)}
          onSubmit={onSubmit}
        />
      ))}
    </div>
  );
}
