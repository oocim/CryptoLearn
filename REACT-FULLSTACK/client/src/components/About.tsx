import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { BookOpen, Lock, Shield, History, Users, Brain, Code, Github, Linkedin, Twitter } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">About CryptoLearn</CardTitle>
          <CardDescription>Empowering the world through cryptography education</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            CryptoLearn is dedicated to making cryptography accessible to everyone. We believe that understanding 
            the principles of secure communication is crucial in our digital age. Through interactive lessons, 
            challenging puzzles, and a supportive community, we aim to demystify the world of cryptography and 
            inspire the next generation of cybersecurity experts.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 text-primary" />
              Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            Explore our comprehensive lessons on various encryption methods and cryptographic concepts.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 text-primary" />
              Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            Apply your knowledge with hands-on exercises and real-world scenarios.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 text-primary" />
              Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            Test your skills with our cryptography challenges and climb the leaderboard.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 text-primary" />
              Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            Test your skills with our cryptography challenges and climb the leaderboard.
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-semibold mb-4 text-primary">Cryptography FAQ</h2>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is cryptography?</AccordionTrigger>
          <AccordionContent>
            Cryptography is the practice and study of techniques for secure communication in the presence of adversaries. 
            It encompasses encryption, decryption, digital signatures, and other methods to protect information.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Why is cryptography important?</AccordionTrigger>
          <AccordionContent>
            Cryptography is crucial for protecting sensitive information, ensuring privacy, and securing digital 
            communications. It's used in various applications, from secure messaging to online banking and blockchain technology.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What are some common types of ciphers?</AccordionTrigger>
          <AccordionContent>
            Common types of ciphers include substitution ciphers (like the Caesar cipher), transposition ciphers, 
            and modern encryption algorithms like AES (Advanced Encryption Standard) and RSA.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How can I start learning cryptography?</AccordionTrigger>
          <AccordionContent>
            Start by understanding basic concepts like ciphers and keys. Practice with simple encryption techniques, 
            then progress to more advanced topics. CryptoLearn offers a structured learning path to guide you through 
            your cryptography journey.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mb-8">
  <CardHeader>
    <CardTitle className="flex items-center">
      <History className="mr-2 text-primary" />
      A Brief History of Cryptography
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="relative flex flex-col items-start">
      {/* Timeline vertical line */}
      <div className="absolute top-0 left-3 h-full border-l-2 border-blue-500"></div>

      {/* Timeline Points */}
      <ul className="space-y-6">
        {/* Timeline point 1 */}
        <li className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="ml-4">
            <p className="font-bold">Ancient times</p>
            <p>Simple substitution ciphers used by Julius Caesar</p>
          </div>
        </li>
        {/* Timeline point 2 */}
        <li className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="ml-4">
            <p className="font-bold">Middle Ages</p>
            <p>Development of polyalphabetic ciphers</p>
          </div>
        </li>
        {/* Timeline point 3 */}
        <li className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="ml-4">
            <p className="font-bold">World War II</p>
            <p>The breaking of the Enigma machine code</p>
          </div>
        </li>
        {/* Timeline point 4 */}
        <li className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="ml-4">
            <p className="font-bold">1970s</p>
            <p>Development of DES (Data Encryption Standard)</p>
          </div>
        </li>
        {/* Timeline point 5 */}
        <li className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="ml-4">
            <p className="font-bold">1990s</p>
            <p>Rise of public-key cryptography (RSA)</p>
          </div>
        </li>
        {/* Timeline point 6 */}
        <li className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="ml-4">
            <p className="font-bold">2000s</p>
            <p>Advanced Encryption Standard (AES) becomes the new standard</p>
          </div>
        </li>
        {/* Timeline point 7 */}
        <li className="flex items-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
          <div className="ml-4">
            <p className="font-bold">Present</p>
            <p>Quantum cryptography and post-quantum cryptography research</p>
          </div>
        </li>
      </ul>
    </div>
  </CardContent>
</Card>


      <h2 className="text-3xl font-semibold mb-4 text-primary">Meet the Developers</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Mico" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center">Mici Raphael F. Cuarto</CardTitle>
            <CardDescription className="text-center">Fullstack Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">Leader manin toh</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500"><Github className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Linkedin className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Twitter className="h-6 w-6" /></a>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Sean" />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center">Sean Kyron Z. Briones</CardTitle>
            <CardDescription className="text-center">Frontend Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">UI/UX specialist with a passion for creating intuitive learning experiences.</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500"><Github className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Linkedin className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Twitter className="h-6 w-6" /></a>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Aldrich" />
              <AvatarFallback>EH</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center">Aldrich Amiel A. Arenas</CardTitle>
            <CardDescription className="text-center">Backend Developer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">Algorithm expert specializing in cryptographic protocols and system security.</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500"><Github className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Linkedin className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-blue-500"><Twitter className="h-6 w-6" /></a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to start your cryptography journey?
        </h2>
        <Link to="/ciphers">
          <Button size="lg" className="mr-4">
            <BookOpen className="ml-2 h-4 w-4" /> Start Learning
          </Button>
        </Link>
        <Link to="/challenges">
          <Button size="lg" variant="outline">
            <Brain className="ml-2 h-4 w-4" /> Try a Challenge
          </Button>
        </Link>
      </div>
    </div>
  )
}