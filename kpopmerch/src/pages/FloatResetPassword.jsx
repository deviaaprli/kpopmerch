import React, { useState } from 'react';
import axios from 'axios';

const FloatResetPassword = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const checkEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/check-email', { email });
      if (response.data.success) {
        setMessage('Email terdaftar, silahkan perbarui password.');
        setIsEmailChecked(true);
      } else {
        setMessage('Email tidak terdaftar.');
      }
    } catch (error) {
      console.error('Error checking email:', error);
      setMessage('Terjadi kesalahan saat memeriksa email.');
    }
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/update-password', { email, password: newPassword });
      if (response.data.success) {
        setMessage('Password berhasil diperbarui.');
        setTimeout(() => {
          onLogin(); 
        }, 5000);
      } else {
        setMessage('Gagal memperbarui password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Terjadi kesalahan saat memperbarui password.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-center mb-4">Lupa Password</h2>

        {message && <p className="text-red-500 text-sm text-center">{message}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Masukkan email
          </label>
          <div className="flex">
            <input 
              type="email" 
              id="email" 
              placeholder="Masukkan email" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-l-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded-r-md"
              onClick={checkEmail}
            >
              Check
            </button>
          </div>
        </div>

        {isEmailChecked && (
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              Masukkan password baru
            </label>
            <input 
              type="password" 
              id="new-password" 
              placeholder="Masukkan password baru" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-center">
          {isEmailChecked && (
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded mr-2"
              onClick={updatePassword}
            >
              Perbarui Password
            </button>
          )}
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatResetPassword;
