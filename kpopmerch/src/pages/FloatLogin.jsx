import React from 'react';

const FloatLogin = ({ onClose, onSignUp }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-center mb-4">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" placeholder="Masukkan username" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" placeholder="Masukkan password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <div className="flex justify-between mb-4 text-sm">
          <a href="#" className="text-blue-500 hover:underline">Lupa Password?</a>
          <button 
            type="button" 
            className="text-blue-500 hover:underline focus:outline-none" 
            onClick={onSignUp} 
          >
            Belum punya akun? Daftar
          </button>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={onClose}>
            Login
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatLogin;
