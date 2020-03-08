import React from 'react';

import Greeting from './components/Greeting';
import List from './components/CityList';

function App() {
  return (
    <div>
      <header className="App-header">Map Your Route</header>
      <Greeting />
      <List />
    </div>
  );
}

export default App;
