import React from 'react';
import styled from 'styled-components';
import User from '../../data/User';

const Container = styled.div`
  background-color: blue;
  color: white;
`;

function Greeting() {
  return (
    <Container>
      <h1>Hi {User.user}!</h1>
    </Container>
  );
}

export default Greeting;
