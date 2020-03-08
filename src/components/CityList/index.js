import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CityDetails from '../../data/CityDetails';
import CitySelection from '../CitySelection';

const Container = styled.div`
  margin: 0 auto;
`;

const mapStateToProps = state => ({
  user: state.user,
  selected: state.selected
});

const mapDispatchToProps = {};

function List({ user, selected }) {
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

  return (
    <Container>
      <h3>Please select the cities you would like to interview at.</h3>
      <div>
        {selected.cities.size} / {user.num_cities} Cities selected
      </div>
      {CityDetails.map(city => (
        <CitySelection key={city.id} city={city} />
      ))}
      <h3>Total Time Spent Traveling</h3>
      {calculateTotalTime()} hours
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
