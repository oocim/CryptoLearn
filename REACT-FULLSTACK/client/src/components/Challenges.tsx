import React, { useState, useEffect } from 'react'
import { Trophy, Star, Lock, Timer, Lightbulb, CheckCircle, HelpCircle, Award } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import BeginnerChallenges from './ChallengeTabContent/Beginner'
import IntermediateChallenges from './ChallengeTabContent/Intermediate'
import AdvancedChallenges from './ChallengeTabContent/Advanced'
import SignUp from './Auth/SignUp'
import Login from './Auth/Login'
import Leaderboard from './ChallengeTabContent/Leaderboard'

export interface Challenge {
  challengeId: number
  title: string
  description: string
  ciphertext: string
  plaintext: string
  points: number
  timeLimit: string
  hint: string
  type: string
  completed: boolean
}

interface ChallengeCardProps {
  challenge: Challenge
  isActive: boolean
  onActivate: () => void
  onSubmit: (answer: string) => void
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isActive, onActivate, onSubmit }) => {
  const [showHint, setShowHint] = React.useState(false)
  const [userAnswer, setUserAnswer] = React.useState('')
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!isActive && !isSubmitted) {
      setIsCorrect(null)
    }
  }, [isActive])

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === challenge.plaintext.trim().toLowerCase()
    setIsCorrect(correct)
    setIsSubmitted(correct)
    if (isCorrect === true) {
      console.log(challenge.plaintext)
    }
    onSubmit(userAnswer)
    setUserAnswer('')
  }

  let cardClass = 'cursor-pointer';

  if (isActive) {
    if (isCorrect) {
      cardClass += ' ring-2 ring-green-500';
    } else if (isCorrect == null) {
      cardClass += ' ring-2 ring-blue-500';
    }
    else {
      cardClass += ' ring-2 ring-red-500';
    }
  }

  return (
    <Card 
    className={cardClass} onClick={onActivate}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="mr-2 h-5 w-5 text-primary" />
            {challenge.title}
          </div>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
            <span className="font-semibold">{challenge.points} pts</span>
          </div>
        </CardTitle>
        <CardDescription>Type: {challenge.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{challenge.description}</p>
        <div className="bg-muted p-4 rounded-md font-mono mb-4">
          {challenge.ciphertext}
        </div>
        {isActive && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-1" />
                Time Limit: {challenge.timeLimit}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowHint(!showHint)
                }}
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
            </div>
            {showHint && (
              <Card>
                <CardContent className="pt-6">
                  <HelpCircle className="h-4 w-4 inline mr-1" />
                  {challenge.hint}
                </CardContent>
              </Card>
            )}
            <Input
              type="text"
              placeholder="Enter your answer..."
              value={isSubmitted ? challenge.plaintext : userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              disabled={isSubmitted}
            />
            {!isSubmitted && (
              <Button
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSubmit()
                }}
              >
                Submit Answer
              </Button>
            )}
            {isCorrect !== null && (
              <p className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                {isCorrect ? 'Correct answer!' : 'Incorrect answer. Try again!'}
              </p>
            )}
          </div>
        )}
        {!isActive && isSubmitted && (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter your answer..."
              value={isSubmitted ? challenge.plaintext : userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              disabled={isSubmitted}
            />
            {isCorrect !== null && (
              <p className={isCorrect ? 'text-green-500' : 'text-red-500'}>
                {isCorrect ? 'Correct answer!' : 'Incorrect answer. Try again!'}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Challenges() {
  const [activeChallengeId, setActiveChallengeId] = useState<number | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

  useEffect(() => {
    // Fetch challenges from an API or load them from a local source
    const fetchChallenges = async () => {
      // Replace this with actual API call or data loading logic
      const response = await fetch('/api/challenges')
      const data = await response.json()
      setChallenges(data)
    }

    fetchChallenges()
  }, [])

  useEffect(() => {
    if (activeChallengeId !== null) {
      const challenge = challenges.find(c => c.challengeId === activeChallengeId)
      setActiveChallenge(challenge || null)
    } else {
      setActiveChallenge(null)
    }
  }, [activeChallengeId, challenges])

  const handleSubmit = async (answer: string) => {
    if (activeChallenge) {
      const isCorrect = answer.trim().toLowerCase() === activeChallenge.plaintext.trim().toLowerCase()

      if (isCorrect) {
        // Update user points
        const newPoints = userPoints + activeChallenge.points
        setUserPoints(newPoints)

        try {
          const response = await fetch('/api/update-points', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ points: newPoints }),
          })

          if (!response.ok) {
            throw new Error('Failed to update points')
          }

          console.log('Points updated successfully')
        } catch (error) {
          console.error('Error updating points:', error)
        }
      }

      // Update the challenge's completed status
      const updatedChallenges = challenges.map(c => 
        c.challengeId === activeChallenge.challengeId ? { ...c, completed: isCorrect } : c
      )
      setChallenges(updatedChallenges)
    }
  }

  const handleSignUp = (username: string, password: string) => {
    // Implement sign up logic here
    console.log('Sign up:', username, password)
    setIsLoggedIn(true)
    setShowSignUp(false)
  }

  const handleLogin = (username: string, password: string) => {
    // Implement login logic here
    console.log('Login:', username, password)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        {showSignUp ? (
          <SignUp onSignUp={handleSignUp} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <Button
          variant="link"
          onClick={() => setShowSignUp(!showSignUp)}
          className="absolute bottom-4"
        >
          {showSignUp ? 'Already have an account? Log in' : 'Don\'t have an account? Sign up'}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cryptography Challenges</h1>
        <div>
          <Button variant="outline" onClick={() => setShowLeaderboard(!showLeaderboard)} className="mr-2">
            {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          </Button>
          <Button variant="ghost" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
      <p className="text-xl text-muted-foreground">Test your skills and level up your knowledge!</p>

      {showLeaderboard && (
        <Leaderboard
          entries={[
            { rank: 1, username: 'cryptomaster', score: 1500 },
            { rank: 2, username: 'cipherexpert', score: 1350 },
            { rank: 3, username: 'enigmasolver', score: 1200 },
            { rank: 4, username: 'decodegenius', score: 1100 },
            { rank: 5, username: 'secretagent', score: 1000 },
          ]}
        />
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Your Progress</h4>
              <p className="text-sm text-muted-foreground">
                Keep going! You're doing great.
              </p>
            </div>
            <div className="flex space-x-2">
              <Award className="h-6 w-6 text-yellow-500" />
              <Award className="h-6 w-6 text-gray-300" />
              <Award className="h-6 w-6 text-gray-300" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="beginner">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="beginner">
          <BeginnerChallenges
            activeChallengeId={activeChallengeId}
            setActiveChallengeId={setActiveChallengeId}
            onSubmit={handleSubmit}
          />
        </TabsContent>
        <TabsContent value="intermediate">
          <IntermediateChallenges
            activeChallengeId={activeChallengeId}
            setActiveChallengeId={setActiveChallengeId}
            onSubmit={handleSubmit}
          />
        </TabsContent>
        <TabsContent value="advanced">
          <AdvancedChallenges
            activeChallengeId={activeChallengeId}
            setActiveChallengeId={setActiveChallengeId}
            onSubmit={handleSubmit}
          />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Challenges Completed</div>
              <div className="text-2xl font-semibold flex items-center mt-1">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                3/10
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Success Rate</div>
              <div className="text-2xl font-semibold flex items-center mt-1">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                75%
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Total Points</div>
              <div className="text-2xl font-semibold flex items-center mt-1">
                <Trophy className="h-5 w-5 text-blue-500 mr-2" />
                {userPoints}
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Current Streak</div>
              <div className="text-2xl font-semibold flex items-center mt-1">
                <Award className="h-5 w-5 text-purple-500 mr-2" />
                5 days
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}