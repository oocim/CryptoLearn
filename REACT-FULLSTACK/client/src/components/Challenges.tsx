import React from 'react'
import { Trophy, Star, Lock, Timer, Lightbulb, CheckCircle, HelpCircle, Award } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import BeginnerChallenges from '../components/ChallengeTabContent/Beginner'
import IntermediateChallenges from '../components/ChallengeTabContent/Intermediate'
import AdvancedChallenges from '../components/ChallengeTabContent/Advanced'

export interface Challenge {
  id: number
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


  return (
    <Card className={`cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''}`} onClick={onActivate}>
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
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onSubmit(userAnswer)
                setUserAnswer('')
              }}
            >
              Submit Answer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Challenges() {
  const [activeChallengeId, setActiveChallengeId] = React.useState<number | null>(null)

  const handleSubmit = (answer: string) => {
    // Implement submission logic here
    console.log('Submitted answer:', answer)
  }

  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center">Cryptography Challenges</h1>
        <p className="text-xl text-center text-muted-foreground">Test your skills and level up your knowledge!</p>

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
                1000
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