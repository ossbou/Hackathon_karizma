require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const recipesRouter = require('./routers/recipe.router');
const usersRouter = require('./routers/users.router');
const userSchema = require('./Models/user.model');
const Recipe = require('./Models/recipe.model');

const app = express();

app.use(express.json());
app.use(recipesRouter);
app.use(usersRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
