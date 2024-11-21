import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { UserPlus } from 'lucide-react'

const SignUp = ({ onSignUp }: { onSignUp: (username: string, email: string, password: string) => void }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')  // To store error messages
  const [loading, setLoading] = useState<boolean>(false)  // To handle loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)  // Start loading state
    setError('')  // Clear previous error message

    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }

    try {
      // Sending the POST request to the API
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Trigger the onSignUp function passed as prop after successful signup
        onSignUp(username, email, password)
      } else {
        // Show error if signup fails
        const errorData = await response.json()
        setError(errorData.message || 'Signup failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)  // End loading state
    }
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
                disabled={loading}  // Disable inputs while loading
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}  // Disable inputs while loading
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
                disabled={loading}  // Disable inputs while loading
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}  {/* Show error message */}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SignUp
