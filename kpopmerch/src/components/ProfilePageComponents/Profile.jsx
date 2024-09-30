import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

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

  const handleAddClick = () => {
    setSelectedAddress({
      nama_penerima: '',
      nomor_telepon: '',
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      alamat: '',
      kode_pos: ''
    });
    setIsAddModal(true);
    setModalVisible(true);
  };

  const handleDeleteClick = async (id) => {
    console.log("Delete ID:", id);
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus alamat ini?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/delete-alamat/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
  
        if (data.success) {
          setAddresses(addresses.filter(address => address.id !== id));
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  const handleUpdateClick = (addressId) => {
    const addressToEdit = addresses.find(address => address.address_id === addressId);
    setSelectedAddress(addressToEdit);
    setIsAddModal(false);
    setModalVisible(true);
  };

  // Save for both adding and updating addresses
  const handleSave = async () => {
    const method = isAddModal ? 'POST' : 'PUT';
    const endpoint = isAddModal 
      ? 'http://localhost:5000/api/add-alamat' 
      : `http://localhost:5000/api/update-alamat/${selectedAddress.address_id}`;

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedAddress),
      });

      const data = await response.json();
      if (data.success) {
        if (isAddModal) {
          setAddresses(prevAddresses => [...prevAddresses, selectedAddress]);
        } else {
          setAddresses(prevAddresses =>
            prevAddresses.map(address =>
              address.address_id === selectedAddress.address_id ? selectedAddress : address
            )
          );
        }
        setModalVisible(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAddress(prevAddress => ({ ...prevAddress, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Hallo, {username}</h1>

      {isLoggedIn && (
        <i className="fas fa-user-circle text-2xl cursor-pointer ml-6" onClick={() => navigate('/')} title="Profile"></i>
      )}

      <button onClick={handleAddClick} className="bg-green-500 text-white rounded px-4 py-2 mt-2">Tambah Alamat</button>
      
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
            <button onClick={() => handleUpdateClick(address.address_id)} className="bg-blue-500 text-white rounded px-4 py-2 mt-2">Update</button>
            <button onClick={() => handleDeleteClick(address.address_id)} className="bg-red-500 text-white rounded px-4 py-2 mt-2">Delete</button>
          </div>
        ))}
      </div>

      {/* Modal for updating address */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold">{isAddModal ? 'Add Address' : 'Update Address'}</h2>
            <label>
              Nama Penerima:
              <input type="text" name="nama_penerima" value={selectedAddress.nama_penerima} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <label>
              Nomor Telepon (08x = 628):
              <input type="text" name="nomor_telepon" value={selectedAddress.nomor_telepon} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <label>
              Provinsi:
              <input type="text" name="provinsi" value={selectedAddress.provinsi} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <label>
              Kota:
              <input type="text" name="kota" value={selectedAddress.kota} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <label>
              Kecamatan:
              <input type="text" name="kecamatan" value={selectedAddress.kecamatan} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <label>
              Kelurahan:
              <input type="text" name="kelurahan" value={selectedAddress.kelurahan} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <label>
              Alamat:
              <input type="text" name="alamat" value={selectedAddress.alamat} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <label>
              Kode Pos:
              <input type="text" name="kode_pos" value={selectedAddress.kode_pos} onChange={handleChange} className="border rounded p-2 w-full" />
            </label>
            <div className="mt-4">
              <button onClick={handleSave} className="bg-green-500 text-white rounded px-4 py-2">Save</button>
              <button onClick={() => setModalVisible(false)} className="bg-red-500 text-white rounded px-4 py-2 ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
