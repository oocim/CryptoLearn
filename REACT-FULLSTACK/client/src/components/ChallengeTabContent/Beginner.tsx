import { useEffect, useState } from 'react';
import { Challenge, ChallengeCard } from '../Challenges';

interface BeginnerChallengesProps {
  activeChallengeId: number | null
  setActiveChallengeId: (id: number | null) => void
  onSubmit: (answer: string) => void
}

export default function BeginnerChallenges({ activeChallengeId, setActiveChallengeId, onSubmit }: BeginnerChallengesProps) {
  const [beginnerChallenges, setBeginnerChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Replace with your backend API endpoint
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://localhost:3000/challenges/caesar/beginner"); // Adjust endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }
        const data: Challenge[] = await response.json();
        setBeginnerChallenges(data);
      } catch (error) {
        console.error('Error fetching beginner challenges:', error);
      }
    };

    fetchChallenges();
  }, []);
  
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