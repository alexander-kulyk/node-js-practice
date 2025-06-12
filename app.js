//core
const express = require('express');
fs = require('fs').promises;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//other
const booksRouter = require('./routes/api/books'); // Importing the books routerd

const app = express();

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', false); // Disable strict query mode

mongoose
  .connect(DB_HOST) // Connect to the MongoDB database using the connection string from environment variables
  .then(() => {
    console.log('The database is connected');
    app.listen(PORT, () => {
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
