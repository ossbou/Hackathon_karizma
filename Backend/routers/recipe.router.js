const express = require('express');
const router = express.Router();
const Recipe = require('../Models/recipe.model');

// Get all recipes for a user
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user._id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single recipe by id
router.get('/recipes/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

// Create a new recipe
router.post('/recipes', async (req, res) => {
  const recipe = new Recipe({
    ...req.body,
  });
  
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a recipe
router.put('/recipes/:id', getRecipe, async (req, res) => {
  Object.entries(req.body).forEach(([key, value]) => {
    res.recipe[key] = value;
  });
  
  try {
    const updatedRecipe = await res.recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a recipe
router.delete('/recipes/:id',getRecipe, async (req, res) => {
  try {
    await res.recipe.remove();
    res.json({ message: 'Deleted recipe' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a recipe object by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
