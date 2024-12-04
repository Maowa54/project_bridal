import Slider from "react-slider";
import { useState, useEffect } from "react";

const RangeSlider = ({ min, max }) => {
  // Initialize with props
  const [values, setValues] = useState([min, max]);

  // Update slider values when min or max props change
  useEffect(() => {
    setValues([min, max]);
  }, [min, max]);

  const handleInputChange = (index, value) => {
    const newValue = Math.max(min, Math.min(max, Number(value))); // Ensure value is within range
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="box w-full px-4 py-2 border rounded shadow">
        <h5 className="whitespace-nowrap py-2 font-medium text-base md:text-lg">
          Price Range
        </h5>
        <Slider
          className="slider my-5 w-full h-1"
          onChange={setValues}
          value={values}
          min={min}
          max={max}
          thumbClassName="size-5 -top-2 bg-white rounded-full border-2 border-blue-900 shadow-lg cursor-pointer transition-transform transform hover:scale-125"
          trackClassName="bg-gradient-to-r from-blue-500 to-blue-900 h-full rounded-lg"
        />
        <div className="flex justify-between my-2">
          <input
            type="number"
            value={values[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="text-center border p-1 rounded w-1/3"
            min={min}
            max={values[1]}
          />
          <span className="value mt-1 mx-2">to</span>
          <input
            type="number"
            value={values[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="text-center border p-1 rounded w-1/3"
            min={values[0]}
            max={max}
          />
        </div>
        <div className="text-center mt-5 mb-2">
          <button className="rounded px-8 hover:text-white hover:bg-gradient-to-b from-teal-500 to-teal-700 hover:border-teal-500 py-1  border">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
