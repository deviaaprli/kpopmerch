import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    // Fetching the username from local storage or another source
    const storedUsername = localStorage.getItem('username'); // Adjust as necessary
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetching addresses from the API
    const fetchAddresses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alamat');
        const data = await response.json();

        if (data.success) {
          setAddresses(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Hallo, {username}</h1>

      {isLoggedIn && (
        <i className="fas fa-user-circle text-2xl cursor-pointer ml-6" onClick={() => navigate('/')}></i>
      )}
      <i className="fas fa-user-circle text-2xl cursor-pointer ml-6" onClick={() => navigate('/')}></i>

      <h2 className="text-xl font-semibold mt-6">Alamat Pengiriman</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <p><strong>Nama Penerima:</strong> {address.nama_penerima}</p>
            <p><strong>Nomor Telepon:</strong> {address.nomor_telepon}</p>
            <p><strong>Provinsi:</strong> {address.provinsi}</p>
            <p><strong>Kota:</strong> {address.kota}</p>
            <p><strong>Kecamatan:</strong> {address.kecamatan}</p>
            <p><strong>Kelurahan:</strong> {address.kelurahan}</p>
            <p><strong>Alamat:</strong> {address.alamat}</p>
            <p><strong>Kode Pos:</strong> {address.kode_pos}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
