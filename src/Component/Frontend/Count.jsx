// Count.jsx
import  { useState} from 'react';

const Count = ({ initialValue, onCountChange }) => {
  const [count, setCount] = useState(initialValue);

  const updateCount = (change) => {
    const newCount = Math.max(count + change, 1); // Ensure count does not go below 1
    setCount(newCount);
    onCountChange(newCount); // Call the parent's handler
  };

  return (
    <div className="flex items-center justify-center">
      <button
  className="bg-gray-200 hover:bg-gray-300 text-lg flex items-center justify-center size-8 rounded-full"
  onClick={() => updateCount(-1)}
>
  -
</button>
<span className="text-sm md:text-base font-semibold text-center mx-2">
  {count}
</span>
<button
  className="bg-gray-200 hover:bg-gray-300 text-lg flex items-center justify-center size-8 rounded-full"
  onClick={() => updateCount(1)}
>
  +
</button>

    </div>
  );
};

export default Count;
