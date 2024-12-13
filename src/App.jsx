import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Meals from './Components/MealComponent.jsx';
import Meals from './Components/Meals.jsx'
import Cocktails from './Components/Cocktails.jsx';
import Potter from './Components/Potter.jsx';
import IndianBanks from './Components/IndianBanks.jsx';

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '0 10px' }}>Meals</Link>
        <Link to="/cocktails" style={{ margin: '0 10px' }}>Cocktails</Link>
        <Link to="/potter" style={{ margin: '0 10px' }}>Potter</Link>
        <Link to="/indian-banks" style={{ margin: '0 10px' }}>Indian Banks</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Meals />} />
        <Route path="/cocktails" element={<Cocktails />} />
        <Route path="/potter" element={<Potter />} />
        <Route path="/indian-banks" element={<IndianBanks />} />
      </Routes>
    </Router>
  );
};

export default App;
