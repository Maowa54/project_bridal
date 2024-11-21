import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';

const ProductSelectedBusiness = ({ onBusinessIdChange }) => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [businessesIds, setBusinessesIds] = useState([]);

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  useEffect(() => {
    if (businessesIds.length > 0) {
      onBusinessIdChange(businessesIds);
    }
  }, [businessesIds, onBusinessIdChange]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`https://admin.attireidyll.com/api/business/index/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setBusinesses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };
    fetchBusinesses();
  }, [token, clientId]);

  // Map businesses data to the format required by react-select
  const options = businesses.map((business) => ({
    value: business.id,
    label: business.name,
  }));

  const allOption = { value: 'all', label: 'All' };
  const allOptions = [allOption, ...options];

  const handleChange = (selected) => {
    if (selected.some(option => option.value === 'all')) {
      setSelectedOptions(options);
      const allBusinessIds = options.map(option => option.value);
      setBusinessesIds(allBusinessIds);

      console.log("Selected all businesses:", options.map(option => ({ businessId: option.value, name: option.label })));
    } else {
      setSelectedOptions(selected);
      const selectedBusinessIds = selected.map(option => option.value);
      setBusinessesIds(selectedBusinessIds);

      console.log("Selected businesses:", selected.map(option => ({ businessId: option.value, name: option.label })));
    }
  };

  return (
    <div>
      <div className="w-auto">
        <Select
          options={allOptions}
          isMulti
          onChange={handleChange}
          value={selectedOptions}
          placeholder="Select businesses..."
        />
      </div>
    </div>
  );
}

export default ProductSelectedBusiness;