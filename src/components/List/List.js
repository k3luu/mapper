import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CityDetails from '../../data/CityDetails';
import Transport from '../../data/Transport';
import {
  updateSelectedCities,
  updateSelectedTransports
} from '../../redux/actions';

const Container = styled.div`
  margin: 0 auto;
`;

const mapStateToProps = state => ({
  user: state.user,
  selected: state.selected
});

const mapDispatchToProps = {
  updateSelectedCities: data => updateSelectedCities(data),
  updateSelectedTransports: data => updateSelectedTransports(data)
};

function List({
  user,
  selected,
  updateSelectedCities,
  updateSelectedTransports
}) {
  function handleCitySelect(e) {
    const value = e.target.checked;
    const name = e.target.name;

    let newList = new Map(selected.cities);
    let newTransportList = new Map(selected.transport);

    if (value && newList.size < user.num_cities) {
      let item = CityDetails.filter(p => p.name === name)[0];
      newList.set(name, item);
    } else {
      newList.delete(name);
      newTransportList.delete(name);
    }

    updateSelectedCities(newList);
    updateSelectedTransports(newTransportList);
  }

  /**
   * @param {*} mode the transport mode we're checking for
   * @param {*} cityName the city we're checking against
   *
   * @return true if mode is available, false if already being used
   */
  function handleTranportAvailable(mode, cityName) {
    let modeForCity = selected.transport.get(cityName).type;

    for (let [key, value] of selected.transport) {
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

    let newTransportList = new Map(selected.transport);
    let item = Transport.filter(p => p.type === value)[0];

    newTransportList.set(name, item);

    updateSelectedTransports(newTransportList);
  }

  function calculateTotalTime() {
    let total = 0;
    let cityDistance, speed;

    for (let [key, value] of selected.cities) {
      cityDistance = value.distance;

      if (selected.transport.has(key)) {
        speed = selected.transport.get(key).speed;
        total += cityDistance / speed;
      }
    }

    return total;
  }
  console.log(selected);

  return (
    <Container>
      <h3>Please select the cities you would like to interview at.</h3>
      <div>
        {selected.cities.size} / {user.num_cities} Cities selected
      </div>
      {CityDetails.map(city => (
        <div key={city.id}>
          <input
            id={city.id}
            type="checkbox"
            name={city.name}
            onChange={handleCitySelect}
            disabled={
              selected.cities.size === user.num_cities &&
              !selected.cities.has(city.name)
            }
          />
          <label htmlFor={city.id}>
            {city.name} - {city.distance} miles away
          </label>
          {selected.cities.has(city.name) && (
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
                  {selected.transport.has(city.name) && // checks if transport has been picked
                  !handleTranportAvailable(mode.type, city.name) && //
                    'Oops, this transport mode has already been used.'}
                </>
              ))}
              <div>
                Time to get there:{' '}
                {selected.transport.has(city.name)
                  ? selected.cities.get(city.name).distance /
                    selected.transport.get(city.name).speed
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

export default connect(mapStateToProps, mapDispatchToProps)(List);
