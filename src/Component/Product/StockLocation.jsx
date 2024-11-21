import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const StockLocation = ({ locationId, onLocationIdChange }) => {
  const [stockLocations, setStockLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  // Fetch stock locations with caching logic
  useEffect(() => {
    const fetchStockLocations = async () => {
      try {
        const cacheKey = `StockLocations_${clientId}`;
        const cacheTimeKey = `StockLocations_${clientId}_timestamp`;
        const cacheValidityDuration = 2 * 60 * 60 * 1000; // 2 hours

        const cachedData = localStorage.getItem(cacheKey);
        const cachedTimestamp = localStorage.getItem(cacheTimeKey);

        const now = Date.now();

        if (cachedData && cachedTimestamp && (now - cachedTimestamp < cacheValidityDuration)) {
          // Use cached data if within the validity duration
          setStockLocations(JSON.parse(cachedData));
          return;
        }

        // Otherwise, make the API call
        const response = await axios.get(`https://admin.attireidyll.com/api/stock_location/get`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const stockLocations = response.data.data || [];

        localStorage.setItem(cacheKey, JSON.stringify(stockLocations));
        localStorage.setItem(cacheTimeKey, now.toString());

        setStockLocations(stockLocations);

      } catch (error) {
        console.error('Error fetching stock locations:', error);
      }
    };

    fetchStockLocations();
  }, [token, clientId]);

  // Update selected location when locationId prop changes
  useEffect(() => {
    if (locationId) {
      const selected = stockLocations.find(location => location.id === locationId);
      setSelectedLocation(selected ? { value: selected.id, label: selected.name } : null);
    }
  }, [locationId, stockLocations]);

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);

    if (selectedOption) {
      onLocationIdChange(selectedOption.value);
    } else {
      onLocationIdChange(""); // Reset the locationId when no location is selected
    }
  };

  const locationOptions = stockLocations.map((location) => ({
    value: location.id,
    label: location.name,
  }));

  return (
    <div>
      <Select
        options={locationOptions}
        value={selectedLocation}
        placeholder="Select a location"
        isClearable
        onChange={handleLocationChange}
      />
    </div>
  );
};

export default StockLocation;
