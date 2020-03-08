import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  background-color: blue;
  color: white;
`;

const mapStateToProps = state => ({
  user: state.user
});

function Greeting({ user }) {
  return (
    <Container>
      <h1>
        Hi {user.name}! You are able to select {user.num_cities} cities.
      </h1>
    </Container>
  );
}

export default connect(mapStateToProps)(Greeting);
