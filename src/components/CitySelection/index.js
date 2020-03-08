import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CityDetails from '../../data/CityDetails';
import TransportSelection from '../TransportSelection';
import {
  updateSelectedCities,
  updateSelectedTransports
} from '../../redux/actions';

const Container = styled.div`
  background-color: blue;
  color: white;
`;

const mapStateToProps = state => ({
  selected: state.selected,
  user: state.user
});

const mapDispatchToProps = {
  updateSelectedCities: data => updateSelectedCities(data),
  updateSelectedTransports: data => updateSelectedTransports(data)
};

const CitySelection = ({
  selected,
  user,
  city,
  updateSelectedCities,
  updateSelectedTransports
}) => {
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

  console.log('CITY', city);

  return (
    <Container>
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
      {selected.cities.has(city.name) && <TransportSelection city={city} />}
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelection);
