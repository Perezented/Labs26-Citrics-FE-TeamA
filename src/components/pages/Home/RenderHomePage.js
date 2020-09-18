import React, { useEffect, useState } from 'react';
import fetchCityData from '../../../api/cityData';

import CityReport from '../../common/CityReport';
import Title from '../../common/Title';
import AddingCities from '../../common/AddingCities';
import StaticHomePage from '../../common/StaticHomePage';

import { SearchContext } from '../../../state/contexts/ReportContext';
import { ReportContext } from '../../../state/contexts/ReportContext';

function RenderHomePage() {
  // state of home page. default state is StaticHomePageComp
  // useState for axios errors
  const [error, setError] = useState('');
  const [cityData, setCityData] = useState([]);
  const [noSearch, setSearched] = useState([]);
  const [compareList, setCompareList] = useState({
    city1: '',
    state1: '',
    city2: '',
    state2: '',
    city3: '',
    state3: '',
  });

  // An object of city data arrays
  const cityDataArr = {};

  useEffect(() => {
    getRentalData();
  }, []);
  // Rental Data from DS API
  const getRentalData = () => {
    fetchCityData()
      .then(response => {
        // console.log('RESPONSE FROM FETCHCITY', response);
        setCityData(response);
      })
      .catch(err => {
        setError(err.message);
      });
  };
  // For each item in cityData array, if it is not in the dicitonary cityDataArr yet, make an array for that city name
  cityData.forEach(value => {
    if (!(value.city in cityDataArr)) {
      cityDataArr[value.city] = [];
    }
    // Push each city and state name into the cityDataArr[state]
    cityDataArr[value.city].push([value.city, value.state]);
  });
  console.log('COMPARE LIST', compareList);
  return (
    <>
      <div className="colorTitle">
        <Title />
      </div>
      <SearchContext.Provider value={cityDataArr}>
        <ReportContext.Provider value={{ compareList, setCompareList }}>
          <AddingCities />
        </ReportContext.Provider>
      </SearchContext.Provider>
      {!noSearch ? (
        <StaticHomePage />
      ) : (
        <ReportContext.Provider value={{ compareList, setCompareList }}>
          <CityReport />
        </ReportContext.Provider>
      )}
      ;
    </>
    // if no search : <StaticHomePageComp/> ? <CityReport/>
  );
}
export default RenderHomePage;
