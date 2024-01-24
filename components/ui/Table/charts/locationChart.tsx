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
    { country: 'United States', percentage: getRandomPercentage() },
    { country: 'United Kingdom', percentage: getRandomPercentage() },
    { country: 'Canada', percentage: getRandomPercentage() },
    { country: 'Australia', percentage: getRandomPercentage() },
    { country: 'Germany', percentage: getRandomPercentage() },
    { country: 'France', percentage: getRandomPercentage() },
    { country: 'India', percentage: getRandomPercentage() },
    { country: 'Brazil', percentage: getRandomPercentage() },
    { country: 'Other', percentage: getRandomPercentage() },
  ];
  
  const stateData = [
    { state: 'California', percentage: getRandomPercentage() },
    { state: 'New York', percentage: getRandomPercentage() },
    { state: 'England', percentage: getRandomPercentage() },
    { state: 'Ontario', percentage: getRandomPercentage() },
    { state: 'New South Wales', percentage: getRandomPercentage() },
    { state: 'Berlin', percentage: getRandomPercentage() },
    { state: 'Île-de-France', percentage: getRandomPercentage() },
    { state: 'Maharashtra', percentage: getRandomPercentage() },
    { state: 'São Paulo', percentage: getRandomPercentage() },
    { state: 'Other', percentage: getRandomPercentage() },
  ];
  
  const cityData = [
    { city: 'Los Angeles', percentage: getRandomPercentage() },
    { city: 'New York City', percentage: getRandomPercentage() },
    { city: 'London', percentage: getRandomPercentage() },
    { city: 'Toronto', percentage: getRandomPercentage() },
    { city: 'Sydney', percentage: getRandomPercentage() },
    { city: 'Berlin', percentage: getRandomPercentage() },
    { city: 'Paris', percentage: getRandomPercentage() },
    { city: 'Mumbai', percentage: getRandomPercentage() },
    { city: 'São Paulo', percentage: getRandomPercentage() },
    { city: 'Other', percentage: getRandomPercentage() },
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
        <p className='self-center font-bold text-left text-gray-400'>{`#${index + 1}`} {item.country || item.state || item.city}</p> <p className='self-center font-bold text-right'>{item.percentage}%</p>
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
