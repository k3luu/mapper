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

/**
 * Component to render the CityDetails list, array of cities
 * where the user can select from.
 */
function CityList({ user, selected }) {
  return (
    <styles.Container>
      <h4>Select the cities where you would like to have your interviews.</h4>
      {CityDetails.map(city => (
        <CitySelection key={city.id} city={city} />
      ))}
    </styles.Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
