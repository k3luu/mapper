import React from 'react';
import { connect } from 'react-redux';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import CityDetails from '../../data/CityDetails';
import TransportList from '../TransportList';
import {
  updateSelectedCities,
  updateSelectedTransportsByCity
} from '../../redux/actions';
import * as styles from './styles';

const mapStateToProps = state => ({
  selected: state.selected,
  user: state.user
});

const mapDispatchToProps = {
  updateSelectedCities: data => updateSelectedCities(data),
  updateSelectedTransportsByCity: data => updateSelectedTransportsByCity(data)
};

const CitySelection = ({
  selected,
  user,
  city,
  updateSelectedCities,
  updateSelectedTransportsByCity
}) => {
  function handleCitySelect(e) {
    const value = e.target.checked;
    const name = e.target.name;

    let newList = new Map(selected.cities);
    let newTransportList = new Map(selected.transportByCityName);

    if (value && newList.size < user.num_cities) {
      let item = CityDetails.filter(p => p.name === name)[0];
      newList.set(name, item);
    } else {
      newList.delete(name);
      newTransportList.delete(name);
    }

    updateSelectedCities(newList);
    updateSelectedTransportsByCity(newTransportList);
  }

  return (
    <styles.ExpansionPanel
      disabled={
        selected.cities.size === user.num_cities &&
        !selected.cities.has(city.name)
      }
      expanded={selected.cities.has(city.name)}
    >
      <styles.ExpansionPanelSummary
        aria-label="Select City"
        aria-controls="select-transportation-content"
        id={`select-city-transportation-${city.id}`}
      >
        <styles.FormControlLabel
          aria-label={`${city.name} Selection`}
          control={
            <styles.Checkbox
              name={city.name}
              color="primary"
              onChange={handleCitySelect}
              disabled={
                selected.cities.size === user.num_cities &&
                !selected.cities.has(city.name)
              }
            />
          }
          // label={`${city.name} - ${city.distance} miles away`}
          label={
            <>
              <styles.MainLabel>{city.name}</styles.MainLabel>
              <styles.Sublabel>Distance: {city.distance} miles</styles.Sublabel>
            </>
          }
        />
      </styles.ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {selected.cities.has(city.name) && <TransportList city={city} />}
      </ExpansionPanelDetails>
    </styles.ExpansionPanel>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelection);
