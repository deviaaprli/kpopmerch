import React, { useState } from 'react';

const FloatSignUp = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z\d]{5,10}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,14}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };

  const handleSignUp = () => {
    setError('');
    setSuccess('');

    if (!username || !password || !email) {
      setError('Semua input harus diisi.');
      return;
    }

    if (!validateUsername(username)) {
      setError('Username harus minimal 5 karakter dan maksimal 10 karakter.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password harus min 8 & max 14 karakter dan mengandung kombinasi huruf dan angka.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email harus menggunakan domain @gmail.com.');
      return;
    }

    const userData = {
      username,
      password,
      email,
      peran: 'Buyer',
    };

    fetch('http://localhost:5000/api/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSuccess(data.message);
        } else {
          setError(data.message);
        }
      })
      .catch(err => {
        console.error('Error during signup:', err);
        setError('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-center mb-4">Daftar</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between mb-4 text-sm">
          <button
            type="button"
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={onLogin}
          >
            Sudah punya akun? Login
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleSignUp} 
          >
            Daftar
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatSignUp;
