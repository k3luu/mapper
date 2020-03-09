import React from 'react';
import styled from 'styled-components';

import Greeting from './components/Greeting';
import CityList from './components/CityList';

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
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
  display: flex;
  flex-direction: row-reverse;

  > div:first-child {
    margin-left: 40px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    max-width: 600px;
    justify-content: center;
    align-items: center;

    > div:first-child {
      margin-left: inherit;
    }
  }
`;

function App() {
  return (
    <>
      <AppHeader>Map Your Route</AppHeader>
      <Content>
        <Greeting />
        <CityList />
      </Content>
    </>
  );
}

export default App;
