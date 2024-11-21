import { useEffect, useState } from 'react';
import { Challenge, ChallengeCard } from '../Challenges';

export const fetchBeginnerChallenges = async (): Promise<Challenge[]> => {
  try {
    const response = await fetch("http://localhost:3000/challenges?category=Beginner");
    if (!response.ok) {
      throw new Error('Failed to fetch challenges');
    }
    const data: Challenge[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching beginner challenges:', error);
    return [];
  }
};

interface BeginnerChallengesProps {
  activeChallengeId: number | null;
  setActiveChallengeId: (id: number | null) => void;
  onSubmit: (answer: string) => void;
}

export default function BeginnerChallenges({ activeChallengeId, setActiveChallengeId, onSubmit }: BeginnerChallengesProps) {
  const [beginnerChallenges, setBeginnerChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const loadChallenges = async () => {
      const challenges = await fetchBeginnerChallenges();
      setBeginnerChallenges(challenges);
    };
    loadChallenges();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {beginnerChallenges.map((challenge) => (
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
