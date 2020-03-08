import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Transport from '../../data/Transport';
import {
  updateSelectedTransportsByName,
  updateSelectedTransportsByType
} from '../../redux/actions';

const Container = styled.div`
  background-color: green;
  color: white;
`;

const mapStateToProps = state => ({
  selected: state.selected
});

const mapDispatchToProps = {
  updateSelectedTransportsByName: data => updateSelectedTransportsByName(data),
  updateSelectedTransportsByType: data => updateSelectedTransportsByType(data)
};

const TransportList = ({
  city,
  selected,
  updateSelectedTransportsByName,
  updateSelectedTransportsByType
}) => {
  function handleTransportSelect(e) {
    const value = e.target.value;
    const name = e.target.name;

    let newTransportList = new Map(selected.transportByCityName);
    let newTransportByType = new Map(selected.transportByType);

    let item = Transport.filter(p => p.type === value)[0];

    newTransportList.set(name, item);
    newTransportByType.set(value, {
      ...item,
      mileageLeft: item.max_distance - city.distance,
      city: city.name
    });

    updateSelectedTransportsByName(newTransportList);
    updateSelectedTransportsByType(newTransportByType);
  }

  /**
   * @param {*} mode the transport mode we're checking for
   * @param {*} cityName the city we're checking against
   *
   * @return true if mode is available, false if already being used
   */
  function handleTranportAvailable(mode, cityName) {
    let modeForCity = selected.transportByCityName.get(cityName).type;

    console.log(mode, cityName, modeForCity);

    // if (mode === modeForCity) {
    //   let usedByThisCity = false;

    //   if (selected.transportByType.has(modeForCity)) {
    //     usedByThisCity =
    //       selected.transportByType.get(modeForCity).city !== cityName;
    //   }

    //   return usedByThisCity;
    // } else {
    //   return true;
    // }

    for (let [key, value] of selected.transportByCityName) {
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

  console.log(
    'TRANSPORT',
    selected.transportByCityName,
    selected.transportByType
  );

  return (
    <Container>
      <h4>How would you like to get there?</h4>
      {Transport.map(mode => (
        <div key={mode.id}>
          <input
            type="radio"
            id={`${city.id}__${mode.type}`}
            name={city.name}
            value={mode.type}
            onChange={handleTransportSelect}
            disabled={mode.max_distance < city.distance}
          />
          <label htmlFor={`${city.id}__${mode.type}`}>{mode.type}</label>

          {selected.transportByCityName.has(city.name) &&
            !handleTranportAvailable(mode.type, city.name) &&
            'Oops, this transport mode has already been used.'}
        </div>
      ))}
      <div>
        Time to get there:{' '}
        {selected.transportByCityName.has(city.name)
          ? selected.cities.get(city.name).distance /
            selected.transportByCityName.get(city.name).speed
          : '_'}{' '}
        hours
      </div>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransportList);
