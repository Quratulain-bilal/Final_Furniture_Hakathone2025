'use client'

import { useState } from 'react';

export default function CreateLabel() {
  const [label, setLabel] = useState(null);

  const handleCreateLabel = async (rateId: string) => {
    try {
      const response = await fetch("/api/shipengine/create-label", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rateId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create label');
      }

      const data = await response.json();
      setLabel(data);
      console.log(data);
    } catch (error) {
      console.error('Error creating label:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleCreateLabel("YOUR_RATE_ID")}>Create Label</button>
      {label && (
        <div>
          {/* Display label information here */}
        </div>
      )}
    </div>
  );
}

