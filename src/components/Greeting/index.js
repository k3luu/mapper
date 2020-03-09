import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const Container = styled.div`
  display: table;
  padding: 0 20px;
  margin: 0 10px;
  border: 2px solid #235789;
  border-radius: 4px;
  position: relative;
  max-width: 250px;
  width: 100%;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  @media (max-width: 900px) {
    width: 100%;
    max-width: unset;
    height: 100%;
  }
`;

const Subtitle = styled.div`
  font-size: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid #235789;
`;

const Counter = styled.div`
  margin: 20px 0;
  font-weight: bold;

  span {
    color: #235789;
  }
`;

const TotalTimeList = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    display: flex;

    > div {
      margin: 10px;
      width: 100px;
    }
  }
`;

const Warning = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  display: flex;
  border-radius: 4px;
  padding: 10px;
  color: #cca20c;
  margin: 20px 0;
  transition: 0.07s;

  > div {
    margin: 0 10px;
    line-height: 1.3;
  }

  span {
    font-weight: bold;
  }
`;

const Success = styled.div`
  opacity: ${props => (props.active ? 1 : 0)};
  text-align: center;
  padding: 10px;
  color: #2c774a;
  margin: 20px 0;
  transition: 0.07s;
  line-height: 1.3;
  font-weight: bold;
`;

const mapStateToProps = state => ({
  user: state.user,
  selected: state.selected
});

/**
 * Renders the greeting message to the user
 */
const Greeting = ({ user, selected }) => {
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

  function handleUniqueTransports() {
    let transportMap = new Map();

    for (let value of selected.transportByCityName.values()) {
      if (transportMap.has(value.type)) {
        return true;
      } else {
        transportMap.set(value.type, true);
      }
    }

    return false;
  }

  return (
    <Container>
      <h1>Hi {user.name}!</h1>
      <Subtitle>
        You have {user.num_cities} cities to select for your interviews.
      </Subtitle>

      <Counter>
        <span>{selected.cities.size}</span> / {user.num_cities} Cities selected
      </Counter>

      <h4>Total Time Spent Traveling</h4>
      <TotalTimeList>
        <li>
          <div>One Way:</div>
          <div>{calculateTotalTime()} hours</div>
        </li>
        <li>
          <div>Round Trip:</div>
          <div>{calculateTotalTime() * 2} hours</div>
        </li>
      </TotalTimeList>

      {handleUniqueTransports() ? (
        <Warning
          active={
            handleUniqueTransports() &&
            selected.transportByCityName.size === user.num_cities
          }
        >
          <InfoOutlinedIcon style={{ color: '#eac435' }} />
          <div>
            <strong>Note:</strong> It doesn't look like you have enough
            resources for these selctions. Please review your city and transport
            selections.
          </div>
        </Warning>
      ) : (
        <Success
          active={
            !handleUniqueTransports() &&
            selected.transportByCityName.size === user.num_cities
          }
        >
          Congrats, you have enough resources for your selected cities! Let's
          get packin!{' '}
          <span role="img" aria-label="Take off!">
            ✈️
          </span>
          <span role="img" aria-label="Smiley Face">
            😊
          </span>
        </Success>
      )}
    </Container>
  );
};

export default connect(mapStateToProps)(Greeting);
