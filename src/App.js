import React from 'react';
import styled from 'styled-components';

import Greeting from './components/Greeting';
import List from './components/CityList';

const AppHeader = styled.header`
  background-color: #235789;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

  height: 60px;
  line-height: 60px;
  vertical-align: middle;
  text-align: center;
`;

const Content = styled.div`
  width: 600px;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <AppHeader>Map Your Route</AppHeader>
      <Content>
        <Greeting />
        <List />
      </Content>
    </>
  );
}

export default App;
