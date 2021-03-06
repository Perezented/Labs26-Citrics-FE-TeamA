import React, { useEffect, useState } from 'react';
// fetches all the available cities for the autocomplete search bar
import fetchCityData from '../../../api/cityData';
// importing of main components
import CityReport from '../../common/CityReport';
import Title from '../Home/Title';
import AddingCities from '../../common/AddingCities';
import StaticHomePage from '../Home/StaticHomePage';
// Contexts
import { SearchContext } from '../../../state/contexts/ReportContext';
import { ReportContext } from '../../../state/contexts/ReportContext';

export default function RenderHomePage() {
  // state of home page. default state is StaticHomePageComp
  // useState for axios errors
  const [error, setError] = useState('');
  const [cityData, setCityData] = useState([]);
  const [compareList, setCompareList] = useState({
    cities: [],
    searched: false,
  });
  // State to set search bar active depending on api responses.
  const [searching, setSearching] = useState({
    weather: false,
    rent: false,
    unemployment: false,
    walkability: false,
    rentPredict: false,
    jobviz: false,
    weatherPredictViz: false,
  });

  // An object of city data arrays
  const cityDataArr = {};
  // As soon as the page loads, retrieve all the available cities to be used for the search bar
  useEffect(() => {
    getRentalData();
  }, []);
  // Cities and State from Rental Data from DS API
  const getRentalData = () => {
    fetchCityData()
      .then(response => {
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
  // Will always display Title and AutoComplete Search Bar
  // Static home page will change to CityReport if compareList.searched is true
  return (
    <>
      <div className="colorTitle">
        <Title />
      </div>
      {error && { error }}
      <SearchContext.Provider value={cityDataArr}>
        <ReportContext.Provider value={{ compareList, setCompareList }}>
          <AddingCities searchOptions={{ searching }} />
        </ReportContext.Provider>
      </SearchContext.Provider>
      {compareList.searched === false ? (
        <>
          <StaticHomePage />
          <div className="colorTitle emptyImg"></div>
        </>
      ) : (
        <ReportContext.Provider
          value={{ compareList, setCompareList, searching, setSearching }}
        >
          <CityReport compareList={compareList} />
        </ReportContext.Provider>
      )}
    </>
  );
}
