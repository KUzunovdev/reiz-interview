import React, { useEffect, useState } from 'react';
import CountryCard from './CountryCard';

interface Country {
  name: string;
  region: string;
  area: number;
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v2/all?fields=name,region,area'
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  
  const sortedAndFilteredCountries = countries
    .slice()
    .sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    )
    .filter((country) => {
      if (filters.includes('smallerThanLithuania')) {
        return country.area < 65300; 
      }
      if (filters.includes('oceaniaRegion')) {
        return country.region === 'Oceania';
      }
      return true;
    });

  const currentCountries = sortedAndFilteredCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

 
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  
  const toggleFilter = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  };

  return (
    <div className="country-list">
      
      <h1 className="title">Simple Country List</h1>

     
      <div className="options">
        <div className='order-container'>
        <button onClick={toggleSortOrder} >
          Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
        </div>
        <div className='right-buttons'>
        <button
          className={filters.includes('smallerThanLithuania') ? 'active' : ''}
          onClick={() => toggleFilter('smallerThanLithuania')}
          style={{ backgroundColor: filters.includes('smallerThanLithuania') ? 'green' : '' }}
        >
          Smaller than Lithuania
        </button>
        <button
          className={filters.includes('oceaniaRegion') ? 'active' : ''}
          onClick={() => toggleFilter('oceaniaRegion')}
        >
          Oceania Region
        </button>
        </div>
      </div>

      
      {currentCountries.map((country) => (
        <CountryCard
          key={country.name}
          name={country.name}
          region={country.region}
          area={country.area}
        />
      ))}

      
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(sortedAndFilteredCountries.length / countriesPerPage) },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryList;