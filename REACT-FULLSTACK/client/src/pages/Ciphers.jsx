import React from 'react';
import { Lock } from 'lucide-react';

function Ciphers() {
  const ciphers = [
    { name: 'Caesar Cipher', desc: 'Learn the classic shift cipher' },
    { name: 'Vigenère Cipher', desc: 'Master polyalphabetic substitution' },
    { name: 'Substitution Cipher', desc: 'Explore simple substitution' }
  ];

  return (
    <div className="ciphers">
      <h1>Cipher Library</h1>
      <div className="cipher-grid">
        {ciphers.map((cipher) => (
          <div key={cipher.name} className="cipher-card">
            <Lock className="cipher-icon" />
            <h3>{cipher.name}</h3>
            <p>{cipher.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ciphers;