import React from 'react';
import './App.css';
import Main from './components/Main';
import AppContextProvider from './context/AppContextProvider';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Main />
      </div>
  </AppContextProvider>
  );
}

export default App;
