//core
const express = require('express');
fs = require('fs').promises;
const cors = require('cors');
const mongoose = require('mongoose');
//other
const booksRouter = require('./routes/api/books'); // Importing the books router
const app = require('./server'); // Importing the server configuration

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

app.use(cors()); // enable CORS for all routes

app.use('/api/books', booksRouter); // Mounting the books router on the /api/books path

app.use(async (req, resp, next) => {
  const { method, url } = req;
  const time = new Date().toISOString();
  await fs.appendFile('server.log', `${time} - ${method} ${url}\n`);
  next();
});

app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, resp) => {
  resp.status(404).send('Not Found');
});
app.use((err, req, resp, next) => {
  const { status = 500, message = 'Internal Server Error' } = err;
  console.error(err.stack);
  resp.status(status).send({ message });
});
