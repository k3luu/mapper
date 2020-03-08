import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #235789;
`;

const Subtitle = styled.div`
  font-size: 14px;
`;

const mapStateToProps = state => ({
  user: state.user
});

function Greeting({ user }) {
  return (
    <Container>
      <h1>Hi {user.name}!</h1>
      <Subtitle>
        You have {user.num_cities} cities to select for your interviews.
      </Subtitle>
    </Container>
  );
}

export default connect(mapStateToProps)(Greeting);
