import { useEffect, useState } from "react";
import { Challenge, ChallengeCard, UserChallengeProgress } from "../Challenges";

export const fetchAdvancedChallenges = async (): Promise<Challenge[]> => {
  try {
    const response = await fetch("http://localhost:3000/challenges?category=Advanced");
    if (!response.ok) {
      throw new Error("Failed to fetch challenges");
    }
    const data: Challenge[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching advanced challenges:", error);
    return [];
  }
};

export const fetchUserProgress = async (): Promise<UserChallengeProgress[]> => {
  try {
    const response = await fetch("http://localhost:3000/challenges/progress");
    if (!response.ok) {
      throw new Error("Failed to fetch user progress");
    }
    const data: UserChallengeProgress[] = await response.json();
    console.log("User Progress:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return [];
  }
};

interface AdvancedChallengesProps {
  activeChallengeId: number | null;
  setActiveChallengeId: (id: number | null) => void;
  onSubmit: (answer: string, challengeId: number) => void;
  updateUserProgress: (progressId: number, challengeId: number, solved: boolean) => void;
  userId: number;
}

export default function AdvancedChallenges({
  activeChallengeId,
  setActiveChallengeId,
  onSubmit,
  updateUserProgress,
  userId,
}: AdvancedChallengesProps) {
  const [advancedChallenges, setAdvancedChallenges] = useState<Challenge[]>([]);
  const [userProgress, setUserProgress] = useState<UserChallengeProgress[]>([]);

  useEffect(() => {
    const loadChallengesAndProgress = async () => {
      const [challenges, progress] = await Promise.all([
        fetchAdvancedChallenges(),
        fetchUserProgress(),
      ]);
      setAdvancedChallenges(challenges);
      setUserProgress(progress);
    };
    loadChallengesAndProgress();
  }, [userId]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {advancedChallenges.map((challenge) => {
        const progress =
          userProgress.find((p) => p.challengeId === challenge.challengeId) || {
            progressId: 0,
            userId: userId,
            challengeId: challenge.challengeId,
            solved: false,
          };
        return (
          <ChallengeCard
            key={challenge.challengeId}
            challenge={challenge}
            userChallengeProgress={progress}
            isActive={activeChallengeId === challenge.challengeId}
            onActivate={() => setActiveChallengeId(challenge.challengeId)}
            onSubmit={(answer: string) => onSubmit(answer, challenge.challengeId)}
            updateUserProgress={updateUserProgress}
          />
        );
      })}
    </div>
  );
}
