import React from 'react';
import { connect } from 'react-redux';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import DirectionsBusOutlinedIcon from '@material-ui/icons/DirectionsBusOutlined';
import FlightOutlinedIcon from '@material-ui/icons/FlightOutlined';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Checkbox from '@material-ui/core/Checkbox';

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
  /**
   * mutate the data about the transport option as transport selections change
   */
  function handleTransportByTypeChange(transportOption) {
    let newTransportByType = new Map(selected.transportByType);

    if (newTransportByType.has(transportOption.type)) {
      let transportItem = newTransportByType.get(transportOption.type);

      if (transportItem.used_by[city.name]) {
        delete transportItem.used_by[city.name];

        if (Object.keys(transportItem.used_by).length === 0) {
          // no city curr using it, so remove from map
          newTransportByType.delete(transportOption.type);
        }
      } else {
        // more than 1 use
        transportItem.used_by[city.name] = true;
        transportItem.mileage_left =
          transportItem.mileage_left >= city.distance
            ? transportItem.mileage_left - city.distance
            : 0;

        newTransportByType.set(transportOption.type, {
          ...transportItem
        });
      }
    } else {
      newTransportByType.set(transportOption.type, {
        max_distance: transportOption.max_distance,
        mileage_left:
          transportOption.max_distance >
          city.distance - calculateMileageCurrUsed()
            ? transportOption.max_distance -
              (city.distance - calculateMileageCurrUsed())
            : 0,
        used_by: {
          [city.name]: true
        }
      });
    }

    updateSelectedTransportsByType(newTransportByType);
  }

  function handleTransportSelect(e) {
    const value = e.target.value;
    const cityName = e.target.name;

    let newTransportByCityName = new Map(selected.transportByCityName);
    let transportOption = Transport.filter(p => p.type === value)[0];

    console.log('transport for', cityName);
    console.log('selected', transportOption);

    handleTransportByTypeChange(transportOption);

    // add the transport option to the map by city's name
    if (newTransportByCityName.has(cityName)) {
      let item = newTransportByCityName.get(cityName);

      // TODO: remove transport if already included and subtract from mileage
      if (item.transport_used[transportOption.type]) {
        delete item.transport_used[transportOption.type];
      } else {
        console.log('adding a new transport to the city');

        if (selected.transportByType.has(transportOption.type)) {
          // if adding another transport to the city
          console.log('adding a used transport to the city');
          let transportItem = selected.transportByType.get(
            transportOption.type
          );

          item.transport_used[transportOption.type] = Math.min(
            transportItem.mileage_left,
            city.distance
          );
        } else {
          console.log('adding an unused transport to the city');
          item.transport_used[transportOption.type] = Math.min(
            transportOption.max_distance,
            city.distance - calculateMileageCurrUsed()
          );
        }
      }

      newTransportByCityName.set(cityName, {
        ...item
      });
    } else {
      if (selected.transportByType.has(transportOption.type)) {
        let transportItem = selected.transportByType.get(transportOption.type);
        newTransportByCityName.set(cityName, {
          transport_used: {
            [transportOption.type]: transportItem.mileage_left
          },
          city_distance: city.distance
        });
      } else {
        newTransportByCityName.set(cityName, {
          transport_used: {
            [transportOption.type]: Math.min(
              transportOption.max_distance,
              city.distance
            )
          },
          city_distance: city.distance
        });
      }
    }

    updateSelectedTransportsByCity(newTransportByCityName);
  }

  function calculateMileageCurrUsed() {
    if (!selected.transportByCityName.has(city.name)) {
      return 0;
    }

    let item = selected.transportByCityName.get(city.name);
    let mileage = 0;

    for (let value of Object.values(item.transport_used)) {
      mileage += value;
    }

    return mileage;
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

  /**
   * return true if available, false if not
   * @param {*} mode
   */
  function handleOptionAvailable(mode) {
    if (
      selected.transportByCityName.has(city.name) &&
      calculateMileageCurrUsed() >=
        selected.transportByCityName.get(city.name).city_distance &&
      !selected.transportByCityName.get(city.name).transport_used[mode.type]
    ) {
      // if city's distance is covered by selections,
      // other options are not needed
      return false;
    } else if (
      selected.transportByType.has(mode.type) &&
      selected.transportByType.get(mode.type).mileage_left === 0 &&
      !selected.transportByType.get(mode.type).used_by[city.name]
    ) {
      return false;
    }

    return true;
  }

  console.log(selected);

  return (
    <styles.Container>
      <h4>How would you like to get there?</h4>

      {Transport.map(mode => (
        <styles.FormControlLabel
          key={mode.id}
          value={mode.type}
          control={
            <Checkbox
              name={city.name}
              color="primary"
              onChange={handleTransportSelect}
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
          disabled={!handleOptionAvailable(mode)}
        />
      ))}

      {selected.transportByCityName.has(city.name) && (
        <div>
          Your options can cover {calculateMileageCurrUsed()} miles of your{' '}
          {city.distance} mile trip.
        </div>
      )}

      {/* <styles.Warning
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
      </styles.Warning> */}

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
