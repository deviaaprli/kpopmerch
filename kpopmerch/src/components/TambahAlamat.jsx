import React, { useState, useEffect } from 'react';

const TambahAlamat = () => {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Fetch Provinces
  useEffect(() => {
    fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/provinces.json`)
      .then(response => response.json())
      .then(data => setProvinces(data));
  }, []);

  // Fetch Regencies based on selected province
  useEffect(() => {
    if (selectedProvince) {
      // Reset dependent fields
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

  // Fetch Districts based on selected regency
  useEffect(() => {
    if (selectedRegency) {
      // Reset dependent fields
      setDistricts([]);
      setVillages([]);
      setSelectedDistrict('');

      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/districts/${selectedRegency}.json`)
        .then(response => response.json())
        .then(data => setDistricts(data));
    }
  }, [selectedRegency]);

  // Fetch Villages based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      // Reset the villages when the district is changed
      setVillages([]);

      fetch(`https://kanglerian.github.io/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`)
        .then(response => response.json())
        .then(data => setVillages(data));
    }
  }, [selectedDistrict]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Provinsi :</label>
          <select
            className="block w-full border rounded px-3 py-2"
            name="provinsi"
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option>Pilih</option>
            {provinces.map((provinsi) => (
              <option key={provinsi.id} value={provinsi.id}>
                {provinsi.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Kabupaten :</label>
          <select
            className="block w-full border rounded px-3 py-2"
            name="kota"
            onChange={(e) => setSelectedRegency(e.target.value)}
            disabled={!selectedProvince}
          >
            <option>Pilih</option>
            {regencies.map((kota) => (
              <option key={kota.id} value={kota.id}>
                {kota.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Kecamatan :</label>
          <select
            className="block w-full border rounded px-3 py-2"
            name="kecamatan"
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedRegency}
          >
            <option>Pilih</option>
            {districts.map((kecamatan) => (
              <option key={kecamatan.id} value={kecamatan.id}>
                {kecamatan.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Kelurahan :</label>
          <select
            className="block w-full border rounded px-3 py-2"
            name="kelurahan"
            disabled={!selectedDistrict}
          >
            <option>Pilih</option>
            {villages.map((kelurahan) => (
              <option key={kelurahan.id} value={kelurahan.id}>
                {kelurahan.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default TambahAlamat;
