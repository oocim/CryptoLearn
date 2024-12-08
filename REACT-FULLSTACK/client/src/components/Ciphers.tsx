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
      icon: KeyRound
    
    },
    {
      name: 'Vigenère Cipher',
      icon: Grid
    
    },
    {
      name: 'Playfair Cipher',
      icon: Shuffle
  
    },
    {
      name: 'Rail Fence Cipher',
      icon: History
    },
    {
      name: 'Simple Substitution Cipher',
      icon: Fingerprint
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

      
      </Tabs>
    </div>
  );
}