import React from 'react';

interface CountryCardProps {
  name: string;
  region: string;
  area: number;
}

const CountryCard: React.FC<CountryCardProps> = ({ name, region, area }) => {
  return (
    <div className="country-card">
      <h3>{name}</h3>
      <p>Region: {region}</p>
      <p>Area: {area} km²</p>
    </div>
  );
};

export default CountryCard;