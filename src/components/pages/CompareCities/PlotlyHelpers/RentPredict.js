import React, { useEffect, useState } from 'react';
import Loader from '../../../common/Loader';
import axios from '../../../../api/dsapi';
// /rental/predict/
export default function RentPredict({
  compareList,
  lastCityState,
  rentalData,
}) {
  // State items to make for easier use.
  const rentalFill = rentalData.rentalFill;
  const rentalPredictData = rentalData.rentalPredictData;
  const setRentalPredictData = rentalData.setRentalPredictData;
  // On last city changes, run this useEffect to pull the rental predict json data.
  useEffect(() => {
    async function fetchRentalPredict() {
      const request = await axios.get(
        `/rental/predict/${lastCityState.lastCity}_${lastCityState.lastState}`
      );
      const res = JSON.parse(request.data);
      const filler = rentalPredictData;
      filler.push(res);
      setRentalPredictData(filler);
    }
    fetchRentalPredict();
  }, [lastCityState.lastCity, lastCityState.lastState]);

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const secondYearOut = currentYear + 2;
  // Rental Fill gets set to jsx text for each rental predict item and their index.
  function dynamicRentPredict(rentalPredictData, index) {
    if (index in rentalPredictData) {
      // Current city in an array format
      let currentCity =
        rentalPredictData[index].city[currentYear + 1] +
        ', ' +
        rentalPredictData[index].state[currentYear + 1];
      // for every index, make a rental fill object containing the jsx to render.
      rentalFill[index] = [
        <section className="rentalFill" key={index}>
          <h3>{currentCity}</h3>
          <div className="rentalPredictData">
            <div className="yaxis">
              <h5># of Rooms</h5>
              <p>Studio</p>
              <p>1 Bedroom</p>
              <p>2 Bedroom</p>
              <p>3 Bedroom</p>
              <p>4 Bedroom</p>
            </div>

            <div className="nextYear">
              <h5>{nextYear}</h5>
              <p>{rentalPredictData[index].Studio[nextYear]}</p>
              <p>{rentalPredictData[index].onebr[nextYear]}</p>
              <p>{rentalPredictData[index].twobr[nextYear]}</p>
              <p>{rentalPredictData[index].threebr[nextYear]}</p>
              <p>{rentalPredictData[index].fourbr[nextYear]}</p>
            </div>
            <div className="twoYearsOut">
              <h5>{secondYearOut}</h5>
              <p>{rentalPredictData[index].Studio[secondYearOut]}</p>
              <p>{rentalPredictData[index].onebr[secondYearOut]}</p>
              <p>{rentalPredictData[index].twobr[secondYearOut]}</p>
              <p>{rentalPredictData[index].threebr[secondYearOut]}</p>
              <p>{rentalPredictData[index].fourbr[secondYearOut]}</p>
            </div>
          </div>
        </section>,
      ];
    }
  }
  // checks the length of the compare list and runs functions to set the rentalFill
  if (compareList.length === 1) {
    dynamicRentPredict(rentalPredictData, 0);
    // Some additional checks to make sure the rentalFill and rentalPredictData are matching compareList
    rentalPredictData.length > 1 &&
      setRentalPredictData([rentalPredictData[0]]);
  }
  if (compareList.length === 2) {
    dynamicRentPredict(rentalPredictData, 1);
    // Some additional checks to make sure the rentalFill and rentalPredictData are matching compareList
    rentalPredictData.length > 2 &&
      setRentalPredictData(rentalPredictData.slice(0, 2));
  }
  if (compareList.length === 3) {
    dynamicRentPredict(rentalPredictData, 2);
  }
  // if rentalFill exists, return the jsx with the rentalFill[index]call
  return rentalFill[0] ? (
    <section className="rentalPredSection">
      {' '}
      <h3>Predictive Rent Prices for the Next 2 Years</h3>
      <div className="rentalPredict">
        {rentalFill[0] && compareList.length >= 1 && rentalFill[0]}
        {rentalFill[1] && compareList.length >= 2 && rentalFill[1]}
        {rentalFill[2] && compareList.length >= 3 && rentalFill[2]}
      </div>
    </section>
  ) : (
    // else load the Loader
    <Loader />
  );
}
