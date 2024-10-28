import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [error, setError] = useState('');

  const validateNamaPenerima = (namaPenerima) => {
    const namaPenerimaRegex = /^[A-Za-z\d]{4,20}$/;
    return namaPenerimaRegex.test(namaPenerima);
  };
  
  const validateNomorTelepon = (nomorTelepon) => {
    const nomorTeleponRegex = /^\d{10,13}$/;
    return nomorTeleponRegex.test(nomorTelepon);
  };
  
  const validateAlamat = (alamat) => {
    const alamatRegex = /(?=.*\bRT\b)(?=.*\bRW\b)/i;
    return alamatRegex.test(alamat);
  };
  
  const validateKodePos = (kodePos) => {
    const kodePosRegex = /^\d{5}$/;
    return kodePosRegex.test(kodePos);
  };
  


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

  const openModalForUpdate = (address) => {
    setSelectedAddress(address);
    setSelectedProvince(address.provinsi);
    setSelectedRegency(address.kota);
    setSelectedDistrict(address.kecamatan);
    setModalVisible(true);
  };

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
    setIsAddModal(true);
    setModalVisible(true);

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
    setSelectedProvince('');
    setSelectedRegency('');
    setSelectedDistrict('');
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
    const {
      nama_penerima,
      nomor_telepon,
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      alamat,
      kode_pos
    } = selectedAddress;
  
    // Validation checks
    
    if (!validateNamaPenerima(nama_penerima)) {
      setError('Nama Penerima harus minimal 4 karakter dan maksimal 20 karakter, hanya mengandung huruf atau angka.');
      return;
    }
    if (!validateNomorTelepon(nomor_telepon)) {
      setError('Nomor Telepon harus berisi angka dan antara 10 hingga 13 digit.');
      return;
    }
    if (!validateAlamat(alamat)) {
      setError('Alamat harus mengandung RT dan RW.');
      return;
    }
    if (!validateKodePos(kode_pos)) {
      setError('Kode Pos harus berisi 5 digit angka.');
      return;
    }
    if (!nama_penerima || !nomor_telepon || !provinsi || !kota || !kecamatan || !kelurahan || !alamat || !kode_pos) {
      setError('Semua input harus diisi.');
      return;
    }
  
    setError(''); // Reset error if all validations pass
  
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
    setSelectedAddress(prevAddress => ({ ...prevAddress, [name]: String(value) }));

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

        {/* Modal for updating address */}
        {modalVisible && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="flex w-full max-w-screen-xl mx-auto" style={{ zIndex: 999 }}>
              <div className="bg-white rounded-lg p-6 shadow-lg w-full">
                <h2 className="text-xl font-bold">{isAddModal ? 'Tambah Alamat' : 'Update Alamat'}</h2>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <form className="flex flex-col mt-4">
                
                  <input
                    type="text"
                    name="nama_penerima"
                    value={selectedAddress.nama_penerima}
                    onChange={handleChange}
                    placeholder="Nama Penerima"
                    required
                    className="border rounded mb-2 p-2"
                  />
                  <input
                    type="text"
                    name="nomor_telepon"
                    value={selectedAddress.nomor_telepon}
                    onChange={handleChange}
                    placeholder="Nomor Telepon"
                    required
                    className="border rounded mb-2 p-2"
                  />
                  <select name="provinsi" value={selectedProvince} onChange={e => handleChange(e)} required className="border rounded mb-2 p-2">
                    <option value="">Pilih Provinsi</option>
                    {provinces.map(province => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </select>
                  <select name="kota" value={selectedRegency} onChange={e => handleChange(e)} required className="border rounded mb-2 p-2">
                    <option value="">Pilih Kota</option>
                    {regencies.map(regency => (
                      <option key={regency.id} value={regency.id}>{regency.name}</option>
                    ))}
                  </select>
                  <select name="kecamatan" value={selectedDistrict} onChange={e => handleChange(e)} required className="border rounded mb-2 p-2">
                    <option value="">Pilih Kecamatan</option>
                    {districts.map(district => (
                      <option key={district.id} value={district.id}>{district.name}</option>
                    ))}
                  </select>
                  <select name="kelurahan" value={selectedAddress.kelurahan} onChange={handleChange} required className="border rounded mb-2 p-2">
                    <option value="">Pilih Kelurahan</option>
                    {villages.map(village => (
                      <option key={village.id} value={village.name}>{village.name}</option>
                    ))}
                  </select>
                  <textarea
                    name="alamat"
                    value={selectedAddress.alamat}
                    onChange={handleChange}
                    placeholder="Alamat"
                    required
                    className="border rounded mb-2 p-2"
                  />
                  <input
                    type="text"
                    name="kode_pos"
                    value={selectedAddress.kode_pos}
                    onChange={handleChange}
                    placeholder="Kode Pos"
                    required
                    className="border rounded mb-2 p-2"
                  />
                  <div className="flex justify-end mt-4">
                    <button type="button" onClick={() => setModalVisible(false)} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">Batal</button>
                    <button type="button" onClick={handleSave} className="bg-blue-500 text-white rounded px-4 py-2">Simpan</button>
                    
                  </div>

                  
                </form>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
