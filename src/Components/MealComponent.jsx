import React, { useEffect, useState } from 'react';
import './MealComponent.css';

const MealComponent = () => {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all meals when the component mounts
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=') // Fetch all meals
      .then((response) => response.json())
      .then((data) => setMeals(data.meals || []));
  }, []);

  // Filter meals based on the search term
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="meal-container">
      <h1 className="title">All Recipes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="meal-list">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h2>{meal.strMeal}</h2>
              <div className="meal-details">
                {/* <p>{meal.strInstructions}</p> */}
                <a href={meal.strSource} target="_blank" rel="noopener noreferrer">View Recipe</a>
              </div>
            </div>
          ))
        ) : (
          <p>No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default MealComponent;