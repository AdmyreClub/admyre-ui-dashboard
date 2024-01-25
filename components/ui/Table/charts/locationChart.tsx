// AudienceLocations.tsx

import React from 'react';

interface LocationData {
  country?: string;
  state?: string;
  city?: string;
  percentage: number;
}

function getRandomPercentage() {
    return Math.floor(Math.random() * 10 + 1); // Generates a random percentage between 1 and 10
  }
  
  const countryData = [
    { country: 'United States', percentage: 45 },
    { country: 'United Kingdom', percentage: 33 },
    { country: 'Canada', percentage: 6 },

   
  ];
  

  
  const cityData = [
    { city: 'Los Angeles', percentage: 55 },
    { city: 'New York City', percentage: 30 },
    { city: 'London', percentage: 3 },
  
  ];
  
  

const AudienceLocations: React.FC = () => {
  

  const getRandomItems = (array: LocationData[], count: number): LocationData[] => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const renderTopLocations = (data: LocationData[]): JSX.Element[] => {
    // Sort data based on percentage in descending order
    data.sort((a, b) => b.percentage - a.percentage);

    // Display top 3 items
    return data.slice(0, 3).map((item, index) => (
      <div key={index} className="shadow-md mb-1 w-[190px] h-[50px] flex justify-between p-3">
        <p className='self-center font-bold text-left text-gray-400'>{`#${index + 1}`} {item.country ||  item.city}</p> <p className='self-center font-bold text-right'>{item.percentage}%</p>
      </div>
    ));
  };

  return (
    <div className="container ml-[-30px] mt-3">
      <h1 className="text-2xl font-bold mb-6">Target Audience</h1>

      <div className="flex justify-around">
        <div className="w-1/3">
          <h2 className="text-xl font-bold mb-4">Countries</h2>
          {renderTopLocations(getRandomItems(countryData, 3))}
        </div>

       

        <div className="w-1/3">
          <h2 className="text-xl font-bold mb-4">Cities</h2>
          {renderTopLocations(getRandomItems(cityData, 3))}
        </div>
      </div>
    </div>
  );
};

export default AudienceLocations;
