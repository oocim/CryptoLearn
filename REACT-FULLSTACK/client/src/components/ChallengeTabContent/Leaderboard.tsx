import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Trophy, Medal } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  username: string
  score: number
}

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/leaderboards')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data: { username: string; points: number }[] = await response.json()

        // Debugging: Check the fetched data
        console.log('Fetched Data:', data)

        // Sort users by points in descending order
        const sortedUsers = data.sort((a, b) => b.points - a.points)

        // Dynamically calculate the rank based on sorted order
        const rankedUsers = sortedUsers.map((user, index) => ({
          username: user.username,
          score: user.points,
          rank: index + 1, // Assign rank starting from 1
        }))

        // Debugging: Check the ranked users
        console.log('Ranked Users:', rankedUsers)

        setEntries(rankedUsers)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="mr-2 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-medium">
                  {entry.rank <= 3 ? (
                    <Medal className={`inline-block mr-2 ${entry.rank === 1 ? 'text-yellow-500' : entry.rank === 2 ? 'text-gray-400' : 'text-amber-600'}`} />
                  ) : null}
                  {entry.rank}
                </TableCell>
                <TableCell>{entry.username}</TableCell>
                <TableCell className="text-right">{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Leaderboard
