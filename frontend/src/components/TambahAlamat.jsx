import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState({
    nama_penerima: '',
    nomor_telepon: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    alamat: '',
    kode_pos: ''
  });

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json`)
      .then(response => response.json())
      .then(data => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setRegencies([]);
      setDistricts([]);
      setVillages([]);
      setSelectedRegency('');
      setSelectedDistrict('');

      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then(response => response.json())
        .then(data => setRegencies(data));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency) {
      setDistricts([]);
      setVillages([]);
      setSelectedDistrict('');

      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
        .then(response => response.json())
        .then(data => setDistricts(data));
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict) {
      setVillages([]);

      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`)
        .then(response => response.json())
        .then(data => setVillages(data));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('user_id'); // Get user_id from localStorage
    
    if (username) {
      setUsername(username);
    }
  
    if (userId) {
      const fetchAddresses = async () => {
        try {
          const response = await fetch(`http://localhost:5000/user/${userId}/addresses`);
          const data = await response.json();
  
          if (data.success) {
            setAddresses(data.data);
          } else {
            console.error(data.message || 'Response error: No message available');
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAddresses();
    }
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
    setSelectedProvince(''); // Reset selected province
    setSelectedRegency(''); // Reset selected regency
    setSelectedDistrict(''); // Reset selected district
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus alamat ini?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/delete-alamat/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();

        if (data.success) {
          setAddresses(addresses.filter(address => address.address_id !== id));
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
    setSelectedProvince(addressToEdit.provinsi); // Set selected province
    setSelectedRegency(addressToEdit.kota); // Set selected regency
    setSelectedDistrict(addressToEdit.kecamatan); // Set selected district
  };

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
          setAddresses(prevAddresses => [...prevAddresses, { ...selectedAddress, address_id: data.address_id }]);
        } else {
          setAddresses(prevAddresses =>
            prevAddresses.map(address =>
              address.address_id === selectedAddress.address_id ? selectedAddress : address
            )
          );
        }
        setModalVisible(false);
        // Reset selected values after saving
        setSelectedProvince('');
        setSelectedRegency('');
        setSelectedDistrict('');
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

    // Update the selected values for the dropdowns
    if (name === 'provinsi') {
      setSelectedProvince(value);
      setSelectedRegency(''); 
      setSelectedDistrict('');
    } else if (name === 'kota') {
      setSelectedRegency(value);
      setSelectedDistrict(''); 
    } else if (name === 'kecamatan') {
      setSelectedDistrict(value);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="Profile" className="flex w-full max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold">Hallo, {username}</h1>

        <button onClick={handleAddClick} className="bg-green-500 text-white rounded px-4 py-2 mt-2">Tambah Alamat</button>
        
        <h2 className="text-xl font-semibold mt-6">Alamat Pengiriman</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.address_id} className="border rounded-lg p-4 shadow-md">
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

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <h2>{isAddModal ? 'Tambah Alamat' : 'Update Alamat'}</h2>
              <label>Nama Penerima</label>
              <input
                name="nama_penerima"
                value={selectedAddress.nama_penerima}
                onChange={handleChange}
              />
              <label>Nomor Telepon</label>
              <input
                name="nomor_telepon"
                value={selectedAddress.nomor_telepon}
                onChange={handleChange}
              />
              <label>Provinsi</label>
              <select
                name="provinsi"
                value={selectedProvince}
                onChange={handleChange}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>

              <label>Kota/Kabupaten</label>
              <select
                name="kota"
                value={selectedRegency}
                onChange={handleChange}
                disabled={!selectedProvince}
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {regencies.map(regency => (
                  <option key={regency.id} value={regency.name}>
                    {regency.name}
                  </option>
                ))}
              </select>

              <label>Kecamatan</label>
              <select
                name="kecamatan"
                value={selectedDistrict}
                onChange={handleChange}
                disabled={!selectedRegency}
              >
                <option value="">Pilih Kecamatan</option>
                {districts.map(district => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>

              <label>Kelurahan/Desa</label>
              <select
                name="kelurahan"
                value={selectedAddress.kelurahan}
                onChange={handleChange}
                disabled={!selectedDistrict}
              >
                <option value="">Pilih Kelurahan/Desa</option>
                {villages.map(village => (
                  <option key={village.id} value={village.name}>
                    {village.name}
                  </option>
                ))}
              </select>

              <label>Alamat Lengkap</label>
              <input
                name="alamat"
                value={selectedAddress.alamat}
                onChange={handleChange}
              />
              <label>Kode Pos</label>
              <input
                name="kode_pos"
                value={selectedAddress.kode_pos}
                onChange={handleChange}
              />

              <button onClick={handleSave} className="bg-green-500 text-white rounded px-4 py-2 mt-2">
                Simpan
              </button>
              <button onClick={() => setModalVisible(false)} className="bg-gray-500 text-white rounded px-4 py-2 mt-2 ml-2">
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;

