import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';

const SelectedBusiness = ({ onSelectBusinesses, businessId , setAddedProducts }) => {
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
          // Use cached data if within the validity duration
          setBusinesses(JSON.parse(cachedData));
          return;
        }
    
        // Otherwise, make the API call
        const response = await axios.get(`https://expressitplus.co.uk/api/business/index/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const businesses = response.data.data || [];
    
        // Store the fetched data in cache along with the timestamp
        localStorage.setItem(cacheKey, JSON.stringify(businesses));
        localStorage.setItem(cacheTimeKey, now.toString());
  
  
    
        // Update the state with the fetched data
        setBusinesses(businesses);
    
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };
  
    fetchBusinesses();
  }, [token, clientId]);
  

  useEffect(() => {
    if (businesses.length > 0) {
      let selectedBusiness;
      if (businessId) {
        selectedBusiness = businesses.find(business => business.id === businessId);
      } else {
        selectedBusiness = businesses[0]; // Default to the first business if no businessId is provided
      }

      if (selectedBusiness) {
        const option = {
          value: selectedBusiness.id,
          label: selectedBusiness.name,
          clientId: selectedBusiness.client_id,
        };
        // Set selected option only if it differs to avoid unnecessary updates
        if (!selectedOption || selectedOption.value !== selectedBusiness.id) {
          setSelectedOption(option);
          onSelectBusinesses([{
            id: selectedBusiness.id,
            clientId: selectedBusiness.client_id,
            name: selectedBusiness.name,
          }]);
        }
      }
    }
  }, [businesses, businessId]); // Exclude onSelectBusinesses from dependencies to prevent re-triggering

  const options = businesses.map(business => ({
    value: business.id,
    label: business.name,
    clientId: business.client_id,
  }));
  const removeAllProducts = () => {
    setAddedProducts([]);
  };
  const handleChange = (selected) => {

 

    setSelectedOption(selected);
    if (selected) {
      onSelectBusinesses([{ id: selected.value, clientId: selected.clientId, name: selected.label }]);
      removeAllProducts();
    } else {
      onSelectBusinesses([]);

    }
  };

  return (
    <div>
      <div className="min-w-[120px] h-10">
        <Select
          options={options}
          onChange={handleChange}
          value={selectedOption}
          placeholder="Select a business..."
        />
      </div>
    </div>
  );
};

export default SelectedBusiness;