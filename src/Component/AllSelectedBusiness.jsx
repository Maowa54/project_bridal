import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';

const AllSelectedBusiness = ({ onBusinessSelect }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const cacheKey = `businesses_${clientId}`;
        const cacheTimeKey = `businesses_${clientId}_timestamp`;
        const cacheValidityDuration = 2 * 60 * 60 * 1000; // 2 hours
    
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimeKey);
    
        const now = Date.now();
    
        if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
          setBusinesses(JSON.parse(cachedData));
          return;
        }
    
        const response = await axios.get(`https://admin.attireidyll.com/api/business/index/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const businesses = response.data.data || [];
        localStorage.setItem(cacheKey, JSON.stringify(businesses));
        localStorage.setItem(cacheTimeKey, now.toString());
        setBusinesses(businesses);
    
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };
  
    fetchBusinesses();
  }, [token, clientId]);

  const options = businesses.map(business => ({
    value: business.id,
    label: business.name,
  }));

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (selected) {
      console.log('Selected ID:', selected.value);
      onBusinessSelect(selected.value); // Pass the selected business ID to the parent component
    }
  };

  return (
    <div className="min-w-[120px] h-10">
      <Select
        options={options}
        onChange={handleChange}
        value={selectedOption}
        placeholder="Select a business..."
      />
    </div>
  );
};

export default AllSelectedBusiness;
