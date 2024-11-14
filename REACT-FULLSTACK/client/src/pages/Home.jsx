import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, BookOpenCheck, Flag, KeyRound, Grid, Shuffle, Fingerprint, History } from 'lucide-react';

export default function Home() {
  return (
    <div className="home">
      <h1 className="page-title">Welcome to CryptoLearn!</h1>
      <p className="page-subtitle">
        Discover the fascinating world of classical cryptography through interactive learning.
      </p>

      <div className="card-grid">
        <div className="card">
          <Lock className="card-icon" />
          <h2>Start Learning</h2>
          <p>Begin your cryptography journey with our interactive tools and comprehensive lessons.</p>
          <Link to="/ciphers" className="button">
            Explore Ciphers
          </Link>
        </div>
        
        <div className="card">
          <BookOpenCheck className="card-icon" />
          <h2>Practice</h2>
          <p>Test your knowledge with interactive exercises and hands-on encryption practice.</p>
          <Link to="/challenges" className="button">
            Start Practicing
          </Link>
        </div>
      </div>

      <div className="try-this">
        <div className="try-this-header">
          <Flag className="try-this-icon" />
          <h2>Try This!</h2>
        </div>
        <p>Can you crack this Caesar cipher? Hint: The shift is 3 letters.</p>
        <div className="cipher-text">
          ZHOFRPH WR FUBSWROHDUQ
        </div>
        <button className="link-button">Show Hint</button>
        <div className="solution-input">
          <label htmlFor="solution">Your Solution</label>
          <input
            type="text"
            id="solution"
            className="input"
            placeholder="Type your answer here"
          />
        </div>
        <button className="button button-primary">Check Solution</button>
      </div>

      <h2 className="section-title">Featured Ciphers</h2>
      <div className="card-grid">
        {[
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
          }
        ].map((cipher) => (
          <div key={cipher.name} className="card cipher-card">
            <cipher.icon className="card-icon" />
            <h3>{cipher.name}</h3>
            <p>{cipher.description}</p>
            <div className="fun-fact">
              <h4>Did you know?</h4>
              <p>{cipher.funFact}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">More to Explore</h2>
      <div className="card-grid">
        <div className="card cipher-card">
          <Fingerprint className="card-icon" />
          <h3>Simple Substitution Cipher</h3>
          <p>Each letter is replaced with another letter consistently throughout the message. With 26! possible combinations, it's more complex than the Caesar cipher.</p>
          <div className="example">
            <p>Example mapping: A→Q, B→W, C→E...</p>
          </div>
        </div>
        <div className="card cipher-card">
          <History className="card-icon" />
          <h3>Rail Fence Cipher</h3>
          <p>A transposition cipher that arranges text in a zigzag pattern along a number of rails, then reads off each rail to produce the ciphertext.</p>
          <div className="example">
            <p>Popular in military communications during the American Civil War!</p>
          </div>
        </div>
      </div>
    </div>
  );
}