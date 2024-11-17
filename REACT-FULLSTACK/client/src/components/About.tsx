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
      <h1 className="text-4xl font-bold mb-6">About CryptoLearn</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
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
              <BookOpen className="mr-2" />
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
              <Lock className="mr-2" />
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
              <Shield className="mr-2" />
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
              <Shield className="mr-2" />
              Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            Test your skills with our cryptography challenges and climb the leaderboard.
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-semibold mb-4">Cryptography FAQ</h2>
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
            <History className="mr-2" />
            A Brief History of Cryptography
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ancient times: Simple substitution ciphers used by Julius Caesar</li>
            <li>Middle Ages: Development of polyalphabetic ciphers</li>
            <li>World War II: The breaking of the Enigma machine code</li>
            <li>1970s: Development of DES (Data Encryption Standard)</li>
            <li>1990s: Rise of public-key cryptography (RSA)</li>
            <li>2000s: Advanced Encryption Standard (AES) becomes the new standard</li>
            <li>Present: Quantum cryptography and post-quantum cryptography research</li>
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-semibold mb-4">Meet the Developers</h2>
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
            <CardTitle className="text-center">Aldrich miel A. Arenas</CardTitle>
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