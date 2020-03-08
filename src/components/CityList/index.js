import React from 'react';
import { connect } from 'react-redux';

import CityDetails from '../../data/CityDetails';
import CitySelection from '../CitySelection';
import * as styles from './styles';

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

      if (selected.transportByCityName.has(key)) {
        speed = selected.transportByCityName.get(key).speed;
        total += cityDistance / speed;
      }
    }

    return total;
  }

  console.log('CITY', selected.cities);

  return (
    <styles.Container>
      <h4>Select the cities where you would like to have your interviews.</h4>
      {CityDetails.map(city => (
        <CitySelection key={city.id} city={city} />
      ))}
      <styles.Counter>
        {selected.cities.size} / {user.num_cities} Cities selected
      </styles.Counter>
      <h4>Total Time Spent Traveling</h4>
      <styles.TotalTimeList>
        <li>
          <div>One Way:</div>
          <div>{calculateTotalTime()} hours</div>
        </li>
        <li>
          <div>Round Trip:</div>
          <div>{calculateTotalTime() * 2} hours</div>
        </li>
      </styles.TotalTimeList>
    </styles.Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
