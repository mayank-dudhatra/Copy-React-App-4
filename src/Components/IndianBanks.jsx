import React, { useState, useEffect } from 'react';

const IndianBanks = () => {
  const [banks, setBanks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://indian-banks-api.onrender.com/banks')
      .then((res) => res.json())
      .then((data) => {
        setBanks(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredBanks = banks.filter((bank) =>
    bank.ifsc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Indian Banks</h1>
      <input
        type="text"
        placeholder="Search by IFSC"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredBanks.map((bank) => (
            <li key={bank.ifsc}>
              {bank.bank_name} - {bank.branch} ({bank.city})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IndianBanks;
