import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false); // Kopyalama durumu için

  const generatePassword = () => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = lowerCaseChars + upperCaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    setPassword(generatedPassword);
    setCopied(false); // Şifre değiştiğinde kopyalama durumunu sıfırla
  };

  // Panoya kopyalama fonksiyonu
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true); // Kopyalandı durumunu güncelle
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Random Password Generator</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg font-medium">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label className="ml-2 text-lg">Include Numbers</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <label className="ml-2 text-lg">Include Symbols</label>
        </div>
        <button
          onClick={generatePassword}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
        >
          Generate Password
        </button>
        {password && (
          <div className="mt-4">
            <label className="block text-lg font-medium">
              Generated Password:
            </label>
            <div className="mt-2 p-2 bg-gray-200 rounded-lg flex justify-between items-center">
              {password}
              <button onClick={copyToClipboard} className="ml-4 text-gray-600">
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </div>
            {copied && (
              <p className="text-green-500 mt-2">
                Password copied to clipboard!
              </p>
            )}
          </div>
        )}
      </div>
      <footer>
        <p className="text-gray-500">
          Created by{' '}
          <a
            href="https://github.com/emirberkoncu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            @emirberkoncu
          </a>
        </p>
      </footer>
    </div>
  );
};

export default PasswordGenerator;
