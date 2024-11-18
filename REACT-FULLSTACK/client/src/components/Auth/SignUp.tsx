import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { UserPlus } from 'lucide-react'

const SignUp = ({ onSignUp }: { onSignUp: (username: string, password: string) => void }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSignUp(username, password)
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserPlus className="mr-2" />
          Sign Up
        </CardTitle>
        <CardDescription>Create an account to start solving challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit}>Sign Up</Button>
      </CardFooter>
    </Card>
  )
}

export default SignUp