import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Grid, Shuffle, KeyRound, Fingerprint, History } from 'lucide-react';
import CaesarCipherTab from "./CiphersTabContent/CeasarCipher";
import VigenereCipherTab from "./CiphersTabContent/VigenèreCipher.tsx";
import PlayfairCipherTab from "./CiphersTabContent/PlayfairCipher.tsx";
import RailFenceCipherTab from "./CiphersTabContent/RailFenceCipher.tsx";
import SimpleSubstitutionCipherTab from "./CiphersTabContent/SimpleSubstitutionCipher.tsx";

export default function Ciphers() {
  const featuredCiphers = [
    {
      name: 'Caesar Cipher',
      icon: KeyRound,
      description: 'A substitution cipher that shifts letters by a fixed number of positions. Used by Julius Caesar for secret communication.',
      funFact: 'With a shift of 13, the Caesar cipher becomes ROT13, where encoding and decoding use the same operation!'
    },
    {
      name: 'Vigenère Cipher',
      icon: Grid,
      description: 'A polyalphabetic cipher using a keyword to shift letters differently at each position.',
      funFact: 'It remained unbroken for 300 years and was known as "le chiffre indéchiffrable" (the unbreakable cipher).'
    },
    {
      name: 'Playfair Cipher',
      icon: Shuffle,
      description: 'Uses pairs of letters and a 5x5 grid for encryption. First practical digraph substitution cipher.',
      funFact: 'Created in 1854 by Charles Wheatstone, but named after Lord Playfair who promoted its use.'
    },
    {
      name: 'Rail Fence Cipher',
      icon: History,
      description: 'A transposition cipher that arranges text in a zigzag pattern along a number of rails, then reads off each rail to produce the ciphertext.',
      funFact: 'It is an example of a transposition cipher, where only the order of the letters is changed.'
    },
    {
      name: 'Simple Substitution Cipher',
      icon: Fingerprint,
      description: 'Each letter is replaced with another letter consistently throughout the message. With 26! possible combinations, it is more complex than the Caesar cipher.',
      funFact: 'Each letter is uniquely replaced, making frequency analysis a key method for breaking it.'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Cipher Library</h1>
      <p className="text-xl text-center text-muted-foreground">Explore our collection of classical ciphers and learn how they work.</p>
      
      <Tabs defaultValue="caesar-cipher">
        <TabsList className="grid w-full grid-cols-5">
          {featuredCiphers.map((cipher) => (
            <TabsTrigger 
              key={cipher.name} 
              value={cipher.name.toLowerCase().replace(/ /g, '-')}
            >
              {cipher.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <CaesarCipherTab />
        <VigenereCipherTab />
        <PlayfairCipherTab />
        <RailFenceCipherTab />
        <SimpleSubstitutionCipherTab />

        {featuredCiphers.filter(cipher => cipher.name !== 'Caesar Cipher').map((cipher) => (
          <TabsContent 
            key={cipher.name} 
            value={cipher.name.toLowerCase().replace(/ /g, '-')}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {React.createElement(cipher.icon, { className: "mr-2 text-primary" })}
                  {cipher.name}
                </CardTitle>
                <CardDescription>{cipher.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">Did you know?</h4>
                <p>{cipher.funFact}</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}