const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    required: true,
    trim: true
  },
  ingredients: [{
    type: String,
    required: true
  }],
  preparationSteps: [{
    type: String,
    required: true
  }],
  prepTime: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: false
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;