import React, { useState } from 'react';
import styled from 'styled-components';
import User from '../../data/User';
import CityDetails from '../../data/CityDetails';
import Transport from '../../data/Transport';

const Container = styled.div`
  margin: 0 auto;
`;

function List() {
  const [selectedCities, setSelected] = useState(new Map());
  const [selectedTransport, setSelectedTransport] = useState(new Map());

  function handleCitySelect(e) {
    const value = e.target.checked;
    const name = e.target.name;

    let newList = new Map(selectedCities);
    let newTransportList = new Map(selectedTransport);

    if (value && newList.size < User.num_cities) {
      let item = CityDetails.filter(p => p.name === name)[0];
      newList.set(name, item);
    } else {
      newList.delete(name);
      newTransportList.delete(name);
    }

    setSelected(newList);
    setSelectedTransport(newTransportList);
  }

  /**
   * @param {*} mode the transport mode we're checking for
   * @param {*} cityName the city we're checking against
   *
   * @return true if mode is available, false if already being used
   */
  function handleTranportAvailable(mode, cityName) {
    let modeForCity = selectedTransport.get(cityName).type;

    for (let [key, value] of selectedTransport) {
      if (
        value.type === modeForCity &&
        mode === modeForCity &&
        key !== cityName
      ) {
        return false;
      }
    }

    return true;
  }

  function handleTransportSelect(e) {
    const value = e.target.value;
    const name = e.target.name;

    let newTransportList = new Map(selectedTransport);
    let item = Transport.filter(p => p.type === value)[0];

    newTransportList.set(name, item);

    setSelectedTransport(newTransportList);
  }

  function calculateTotalTime() {
    let total = 0;
    let cityDistance, speed;

    for (let [key, value] of selectedCities) {
      cityDistance = value.distance;

      if (selectedTransport.has(key)) {
        speed = selectedTransport.get(key).speed;
        total += cityDistance / speed;
      }
    }

    return total;
  }
  console.log(selectedCities, selectedTransport);

  return (
    <Container>
      <h3>Please select the cities you would like to interview at.</h3>
      <div>
        {selectedCities.size} / {User.num_cities} Cities selected
      </div>
      {CityDetails.map(city => (
        <div key={city.id}>
          <input
            id={city.id}
            type="checkbox"
            name={city.name}
            onChange={handleCitySelect}
            disabled={
              selectedCities.size === User.num_cities &&
              !selectedCities.has(city.name)
            }
          />
          <label htmlFor={city.id}>
            {city.name} - {city.distance} miles away
          </label>
          {selectedCities.has(city.name) && (
            <div>
              <h4>How would you like to get there?</h4>
              {Transport.map(mode => (
                <>
                  <input
                    key={mode.id}
                    type="radio"
                    id={`${city.id}__${mode.type}`}
                    name={city.name}
                    value={mode.type}
                    onChange={handleTransportSelect}
                    disabled={mode.max_distance < city.distance}
                  />
                  <label htmlFor={`${city.id}__${mode.type}`}>
                    {mode.type}
                  </label>
                  {selectedTransport.has(city.name) && // checks if transport has been picked
                  !handleTranportAvailable(mode.type, city.name) && //
                    'Oops, this transport mode has already been used.'}
                </>
              ))}
              <div>
                Time to get there:{' '}
                {selectedTransport.has(city.name)
                  ? selectedCities.get(city.name).distance /
                    selectedTransport.get(city.name).speed
                  : '_'}{' '}
                hours
              </div>
            </div>
          )}
        </div>
      ))}
      <h3>Total Time Spent Traveling</h3>
      {calculateTotalTime()} hours
    </Container>
  );
}

export default List;
