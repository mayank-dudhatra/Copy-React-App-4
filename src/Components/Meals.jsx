import React, { useState, useEffect } from 'react';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals);
        setLoading(false);
        console.log(data)
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Meals</h1>
      <input
        type="text"
        placeholder="Search Meals"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredMeals.map((meal) => (
            <li key={meal.idMeal}>{meal.strMeal}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Meals;
