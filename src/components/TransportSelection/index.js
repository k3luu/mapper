import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Transport from '../../data/Transport';
import { updateSelectedTransports } from '../../redux/actions';

const Container = styled.div`
  background-color: blue;
  color: white;
`;

const mapStateToProps = state => ({
  selected: state.selected
});

const mapDispatchToProps = {
  updateSelectedTransports: data => updateSelectedTransports(data)
};

const TransportSelection = ({ city, selected, updateSelectedTransports }) => {
  function handleTransportSelect(e) {
    const value = e.target.value;
    const name = e.target.name;

    let newTransportList = new Map(selected.transport);
    let item = Transport.filter(p => p.type === value)[0];

    newTransportList.set(name, item);

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

  console.log('TRANSPORT', selected.transport);

  return (
    <Container>
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
          <label htmlFor={`${city.id}__${mode.type}`}>{mode.type}</label>
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
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransportSelection);
