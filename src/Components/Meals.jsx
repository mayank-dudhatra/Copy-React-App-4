import React, { useState, useEffect } from 'react';
import './Meals.css'; // Import the CSS file

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [filterByCategory, setFilterByCategory] = useState('');
  const [filterByArea, setFilterByArea] = useState('');
  const [filterByIngredient, setFilterByIngredient] = useState('');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchAreas();
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (!search && !filterByCategory && !filterByArea && !filterByIngredient) {
      fetchMealsByFirstLetter('a');
    } else if (search) {
      fetchMealsByName(search);
    } else if (filterByCategory) {
      fetchMealsByCategory(filterByCategory);
    } else if (filterByArea) {
      fetchMealsByArea(filterByArea);
    } else if (filterByIngredient) {
      fetchMealsByIngredient(filterByIngredient);
    }
  }, [search, filterByCategory, filterByArea, filterByIngredient]);

  const fetchMealsByName = (name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const fetchMealsByFirstLetter = (letter) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const fetchMealsByCategory = (category) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const fetchMealsByArea = (area) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const fetchMealsByIngredient = (ingredient) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const fetchCategories = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
      })
      .catch((err) => console.error(err));
  };

  const fetchAreas = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.meals || []);
      })
      .catch((err) => console.error(err));
  };

  const fetchIngredients = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data.meals || []);
      })
      .catch((err) => console.error(err));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setLoading(true);
  };

  const handleCategoryChange = (e) => {
    setFilterByCategory(e.target.value);
    setLoading(true);
  };

  const handleAreaChange = (e) => {
    setFilterByArea(e.target.value);
    setLoading(true);
  };

  const handleIngredientChange = (e) => {
    setFilterByIngredient(e.target.value);
    setLoading(true);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="meals-container">
      <h1>Meals</h1>

      {/* Search Section */}
      <input
        type="text"
        placeholder="Search Meals"
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />

      {/* Category Filter */}
      <select onChange={handleCategoryChange} className="filter-select">
        <option value="">Filter by Category</option>
        {categories.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>

      {/* Area Filter */}
      <select onChange={handleAreaChange} className="filter-select">
        <option value="">Filter by Area</option>
        {areas.map((area) => (
          <option key={area.strArea} value={area.strArea}>
            {area.strArea}
          </option>
        ))}
      </select>

      {/* Ingredient Filter */}
      <select onChange={handleIngredientChange} className="filter-select">
        <option value="">Filter by Ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.strIngredient} value={ingredient.strIngredient}>
            {ingredient.strIngredient}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="meal-cards">
          {filteredMeals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <div className="meal-card-content">
                <h3>{meal.strMeal}</h3>
                <p>Category: {meal.strCategory || 'N/A'}</p>
                <p>Area: {meal.strArea || 'N/A'}</p>
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-recipe-link"
                >
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
