import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 20px;
  margin: 0 10px;
  border: 1px solid #235789;
  border-radius: 4px;
  position: relative;
  height: 300px;
  max-width: 300px;
  width: 100%;

  @media (max-width: 900px) {
    width: 100%;
    max-width: unset;
  }
`;

const Subtitle = styled.div`
  font-size: 14px;
`;

const Counter = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const TotalTimeList = styled.ul`
  list-style-type: none;

  li {
    display: flex;

    > div {
      margin: 10px;
      width: 100px;
    }
  }
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

  return (
    <Container>
      <h1>Hi {user.name}!</h1>
      <Subtitle>
        You have {user.num_cities} cities to select for your interviews.
      </Subtitle>

      <Counter>
        {selected.cities.size} / {user.num_cities} Cities selected
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
    </Container>
  );
};

export default connect(mapStateToProps)(Greeting);
