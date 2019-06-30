import React from 'react';
import TopNavBar from './components/TopNavBar';
import MyMovies from './components/MyMovies';
import './App.scss';


const App: React.FC = () => {
  return (
    <div className="App">
      <TopNavBar />
      <MyMovies />
    </div>
  );
}

export default App;
