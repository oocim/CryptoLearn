import React, { useState, useEffect, useCallback } from 'react'
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
  _id: string
  title: string
  description: string
  ciphertext: string
  plaintext: string
  points: number
  timeLimit: string
  hint: string
  cipherType: string
  cipherMode: string
  completed: boolean
}

export interface UserChallengeProgress {
  progressId: number
  username: string
  challengeId: string
  solved: boolean
}

interface LeaderboardEntry {
  rank: number
  username: string
  score: number
  points: number
  solvedChallenges: number
}

interface LocalStorageUser {
  username: string
  solvedChallenges: number
  userPoints: number
}

interface ChallengeCardProps {
  challenge: Challenge
  userChallengeProgress: UserChallengeProgress
  isActive: boolean
  onActivate: () => void
  onSubmit: (answer: string, challengeId: string) => void
  updateUserProgress: (username: string, challengeId: string, solved: boolean) => void
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ 
  challenge, 
  userChallengeProgress, 
  isActive, 
  onActivate, 
  onSubmit,
  updateUserProgress 
}) => {
  const [showHint, setShowHint] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(userChallengeProgress.solved)
  const [currentUsername, setCurrentUsername] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setCurrentUsername(storedUsername)
    }
  }, [])

  useEffect(() => {
    if (!isActive && !isSubmitted) {
      setIsCorrect(null)
    }
    else if (isSubmitted) {
      setIsCorrect(true)
    }
  }, [isActive])

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === challenge.plaintext.trim().toLowerCase()
    setIsCorrect(correct)
    setIsSubmitted(correct)
    if (correct) {
      updateUserProgress(currentUsername, challenge._id, true)
    }
    onSubmit(userAnswer, challenge._id)
    setUserAnswer('')
  }

  let cardClass = 'cursor-pointer'

  if (isActive) {
    if (isCorrect) {
      cardClass += ' ring-2 ring-green-500'
    } else if (isCorrect == null) {
      cardClass += ' ring-2 ring-blue-500'
    } else {
      cardClass += ' ring-2 ring-red-500'
    }
  }

  return (
    <Card className={cardClass} onClick={onActivate}>
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
        <CardDescription>Type: {challenge.cipherType}, {challenge.cipherMode}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{challenge.description}</p>
        <div className="bg-muted p-4 rounded-md font-mono mb-4">
          {challenge.ciphertext}
        </div>
        {isActive && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
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
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const [currentUsername, setCurrentUsername] = useState('')
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([])
  const [solvedChallengesCount, setSolvedChallengesCount] = useState(0)

  // Utility function to manage localStorage
  const updateLocalStorage = (user: LocalStorageUser) => {
    localStorage.setItem('username', user.username)
    localStorage.setItem('totalSolvedChallenges', user.solvedChallenges.toString())
    localStorage.setItem('userPoints', user.userPoints.toString())
  }

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    const storedUserPoints = localStorage.getItem('userPoints')
    const storedSolvedChallenges = localStorage.getItem('totalSolvedChallenges')

    if (storedUsername && storedUserPoints && storedSolvedChallenges) {
      setIsLoggedIn(true)
      setCurrentUsername(storedUsername)
      setUserPoints(Number(storedUserPoints))
      setSolvedChallengesCount(Number(storedSolvedChallenges))
    }
  }, [])

  // Fetch and update leaderboard data
  const fetchLeaderboardData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/users/leaderboards')
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard data')
      }
      const data: LeaderboardEntry[] = await response.json()

      setLeaderboardEntries(data)
      const userEntry = data.find(entry => entry.username === currentUsername)

      if (userEntry) {
        const updatedUser: LocalStorageUser = {
          username: currentUsername,
          solvedChallenges: userEntry.solvedChallenges || 0,
          userPoints: userEntry.points || 0
        }

        updateLocalStorage(updatedUser)
        setSolvedChallengesCount(updatedUser.solvedChallenges)
        setUserPoints(updatedUser.userPoints)
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error)
    }
  }, [currentUsername])

  // Periodic leaderboard data fetch
  useEffect(() => {
    if (isLoggedIn) {
      fetchLeaderboardData() // Initial fetch

      // Set up polling interval
      const intervalId = setInterval(fetchLeaderboardData, 5000) // Fetch every 5 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId)
    }
  }, [fetchLeaderboardData, isLoggedIn])

  // Update active challenge when challenge ID changes
  useEffect(() => {
    if (activeChallengeId !== null) {
      const challenge = challenges.find(c => c._id === activeChallengeId)
      setActiveChallenge(challenge || null)
    } else {
      setActiveChallenge(null)
    }
  }, [activeChallengeId, challenges])

  // Handle challenge submission
  const handleSubmit = async (answer: string) => {
    if (activeChallenge) {
      const updatedChallenges = challenges.map(c => 
        c._id === activeChallenge._id ? { ...c, completed: true } : c
      )
      setChallenges(updatedChallenges)

      const isCorrect = answer.trim().toLowerCase() === activeChallenge.plaintext.trim().toLowerCase()

      if (isCorrect) {
        const newPoints = userPoints + activeChallenge.points
        setUserPoints(newPoints)

        try {
          const response = await fetch("http://localhost:3000/user-progress/submit-answer", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              username: currentUsername,
              challengeId: activeChallenge._id,
              solved: true
            }),
          })

          if (!response.ok) {
            throw new Error('Failed to update points')
          }

          await fetchLeaderboardData()
        } catch (error) {
          console.error('Error updating points:', error)
        }
      }
    }
  }

  // Authentication handlers
  const handleSignUp = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      const userData = await response.json()
      
      const userStorageData: LocalStorageUser = {
        username,
        solvedChallenges: 0,
        userPoints: 0
      }

      updateLocalStorage(userStorageData)
      setCurrentUsername(username)
      setIsLoggedIn(true)
      setShowSignUp(false)
    } catch (error) {
      console.error('Signup error:', error)
    }
  }

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const userInfoResponse = await fetch(`http://localhost:3000/users/user-info/${username}`)
      
      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info')
      }

      const userInfo = await userInfoResponse.json()
    
      const userStorageData: LocalStorageUser = {
        username,
        solvedChallenges: userInfo.solvedChallenges || 0,
        userPoints: userInfo.points || 0
      }

      updateLocalStorage(userStorageData)
      setCurrentUsername(username)
      setUserPoints(userInfo.points || 0)
      setSolvedChallengesCount(userInfo.solvedChallenges || 0)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleLogout = () => {
    // Clear all relevant localStorage items
    ['username', 'totalSolvedChallenges', 'userPoints'].forEach(key => 
      localStorage.removeItem(key)
    )

    setIsLoggedIn(false)
    setCurrentUsername('')
    setUserPoints(0)
    setSolvedChallengesCount(0)
  }

  // Update user progress
  const updateUserProgress = async (username: string, challengeId: string, solved: boolean) => {
    if (!username) {
      console.error('Username not found')
      return
    }

    try {
      const response = await fetch("http://localhost:3000/user-progress/submit-answer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, challengeId, solved }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit answer')
      }

      await fetchLeaderboardData()
    } catch (error) {
      console.error('Error submitting answer:', error)
    }
  }

  // Render login/signup if not logged in
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
        <h1 className="text-3xl font-bold text-primary">Cryptography Challenges</h1>
        <div>
          <Button variant="outline" onClick={() => setShowLeaderboard(!showLeaderboard)} className="mr-2">
            {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          </Button>
          <Button variant="ghost" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
      <p className="text-xl text-muted-foreground">Test your skills and level up your knowledge!</p>

      {showLeaderboard && (
        <Leaderboard/>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Hi {currentUsername}!</h4>
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
            updateUserProgress={updateUserProgress}
            username={currentUsername}
          />
        </TabsContent>
        <TabsContent value="intermediate">
          <IntermediateChallenges
            activeChallengeId={activeChallengeId}
            setActiveChallengeId={setActiveChallengeId}
            onSubmit={handleSubmit}
            updateUserProgress={updateUserProgress}
            username={currentUsername}
          />
        </TabsContent>
        <TabsContent value="advanced">
          <AdvancedChallenges
            activeChallengeId={activeChallengeId}
            setActiveChallengeId={setActiveChallengeId}
            onSubmit={handleSubmit}
            updateUserProgress={updateUserProgress}
            username={currentUsername}
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
                {localStorage.totalSolvedChallenges}
              </div>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm text-muted-foreground">Total Points</div>
              <div className="text-2xl font-semibold flex items-center mt-1">
                <Trophy className="h-5 w-5 text-blue-500 mr-2" />
                {localStorage.userPoints}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}