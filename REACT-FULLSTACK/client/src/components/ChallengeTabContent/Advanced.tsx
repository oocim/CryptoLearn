import { useEffect, useState } from 'react';
import { Challenge, ChallengeCard } from '../Challenges';

export const fetchAdvancedChallenges = async (): Promise<Challenge[]> => {
  try {
    const response = await fetch("http://localhost:3000/challenges?category=Advanced");
    if (!response.ok) {
      throw new Error('Failed to fetch challenges');
    }
    const data: Challenge[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching advanced challenges:', error);
    return [];
  }
};

interface AdvancedChallengesProps {
  activeChallengeId: number | null;
  setActiveChallengeId: (id: number | null) => void;
  onSubmit: (answer: string) => void;
}

export default function AdvancedChallenges({ activeChallengeId, setActiveChallengeId, onSubmit }: AdvancedChallengesProps) {
  const [advancedChallenges, setAdvancedChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const loadChallenges = async () => {
      const challenges = await fetchAdvancedChallenges();
      setAdvancedChallenges(challenges);
    };
    loadChallenges();
  }, []);

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
  );
}
