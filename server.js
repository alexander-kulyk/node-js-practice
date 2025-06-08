//core
const mongoose = require('mongoose');
const express = require('express');

const app = express(); // server

const dbURI =
  'mongodb+srv://alexander:n36KiOXW8LvwDqil@cluster0.x080npf.mongodb.net/books_reader?retryWrites=true&w=majority&appName=Cluster0';

mongoose.set('strictQuery', false); // Disable strict query mode

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('The database is connected');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

module.exports = app;
