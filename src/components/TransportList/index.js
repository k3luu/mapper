import React from 'react';
import { connect } from 'react-redux';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import DirectionsBusOutlinedIcon from '@material-ui/icons/DirectionsBusOutlined';
import FlightOutlinedIcon from '@material-ui/icons/FlightOutlined';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import Transport from '../../data/Transport';
import {
  changeUserHasResources,
  updateSelectedTransportsByCity,
  updateSelectedTransportsByType
} from '../../redux/actions';
import * as styles from './styles';

const mapStateToProps = state => ({
  selected: state.selected
});

const mapDispatchToProps = {
  changeUserHasResources: data => changeUserHasResources(data),
  updateSelectedTransportsByCity: data => updateSelectedTransportsByCity(data),
  updateSelectedTransportsByType: data => updateSelectedTransportsByType(data)
};

/**
 * Displays the transportation options available for a city.
 *
 * Behavior:
 *  - Options will be disabled if transportation cannot cover
 *    distance of city
 *  - Warning message will appear to note when more than one city
 *    has selected the same transport option
 */
const TransportList = ({
  city,
  selected,
  changeUserHasResources,
  updateSelectedTransportsByCity,
  updateSelectedTransportsByType
}) => {
  function handleTransportSelect(e) {
    const value = e.target.value;
    const cityName = e.target.name;

    let newTransportList = new Map(selected.transportByCityName);

    let transportOption = Transport.filter(p => p.type === value)[0];
    let transportTypeUsed = false;

    newTransportList.set(cityName, transportOption);
    // newTransportList.set(cityName, {
    //   ...transportOption,
    //   unit: // decrement unit
    // });

    for (let [key, value] of selected.transportByCityName) {
      if (value.type === transportOption.type && key !== city.name) {
        transportTypeUsed = true;
      }
    }

    changeUserHasResources(!transportTypeUsed);
    updateSelectedTransportsByCity(newTransportList);
  }

  /**
   * @return string of city using the transport, null if not in use
   */
  function handleTranportAvailable() {
    if (!selected.transportByCityName.has(city.name)) {
      return null;
    }

    let typeCurrCityUsing = selected.transportByCityName.get(city.name).type;

    for (let [key, value] of selected.transportByCityName.entries()) {
      if (value.type === typeCurrCityUsing && key !== city.name) {
        return key;
      }
    }

    return null;
  }

  function displayIconType(type) {
    switch (type) {
      case 'Car':
        return <DriveEtaOutlinedIcon />;

      case 'Train':
        return <TrainOutlinedIcon />;

      case 'Bus':
        return <DirectionsBusOutlinedIcon />;

      case 'Plane':
        return <FlightOutlinedIcon />;

      default:
        return;
    }
  }

  return (
    <styles.Container>
      <h4>How would you like to get there?</h4>
      <styles.RadioGroup
        aria-label={`${city.name} Transport`}
        name={city.name}
        onChange={handleTransportSelect}
      >
        {Transport.map(mode => (
          <styles.FormControlLabel
            key={mode.id}
            value={mode.type}
            control={
              <styles.Radio
                color="primary"
                inputProps={{ ...{ 'data-testid': `${mode.type}-test` } }}
              />
            }
            label={
              <>
                <div>{displayIconType(mode.type)}</div>
                <div>{mode.type}</div>
              </>
            }
            labelPlacement="top"
            disabled={mode.max_distance < city.distance}
          />
        ))}
      </styles.RadioGroup>

      <styles.Warning
        active={
          !!handleTranportAvailable() &&
          selected.transportByCityName.has(handleTranportAvailable())
        }
      >
        <InfoOutlinedIcon style={{ color: '#eac435' }} />
        <div>
          Oops, this option has already been planned for your{' '}
          <span>{handleTranportAvailable()}</span> trip. Please select another
          mode of transportation.
        </div>
      </styles.Warning>

      <styles.TimeToDestination>
        Time to destination:{' '}
        {selected.transportByCityName.has(city.name)
          ? Math.floor(
              selected.cities.get(city.name).distance /
                selected.transportByCityName.get(city.name).speed
            )
          : '_'}{' '}
        hours
      </styles.TimeToDestination>
    </styles.Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransportList);
