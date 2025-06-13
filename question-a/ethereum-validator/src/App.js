import React, { useState } from 'react';
import './App.css';

function isValidEthereumAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const handleValidate = () => {
    const addresses = input.split(/[\n,]+/).map(addr => addr.trim()).filter(Boolean);
    const processed = addresses.map(addr => ({
      address: addr,
      isValid: isValidEthereumAddress(addr)
    }));
    setResults(processed);
  };

  const copyValid = () => {
    const valid = results.filter(r => r.isValid).map(r => r.address).join('\n');
    navigator.clipboard.writeText(valid);
  };

  return (
    <div className="container">
      <h1>Ethereum Wallet Validator</h1>
      <textarea
        placeholder="Enter addresses, one per line or comma-separated"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
      />
      <div className="buttons">
        <button onClick={handleValidate}>Validate</button>
        <button onClick={copyValid}>Copy Valid</button>
      </div>
      <ul>
        {results.map((res, idx) => (
          <li key={idx} className={res.isValid ? 'valid' : 'invalid'}>
            {res.isValid ? '✅ Valid — ' : '❌ Invalid — '}
            {res.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
