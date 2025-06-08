const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const bookPath = path.join(__dirname, 'books.json');

const getAll = async () => {
  const allBooks = await fs.readFile(bookPath);
  return JSON.parse(allBooks);
};

const getById = async (id) => {
  const allBooks = await getAll();
  return allBooks.find((book) => book.id === id) || null;
};

const add = async (data) => {
  const allBooks = await getAll();
  const newBook = {
    id: nanoid(),
    ...data,
  };

  allBooks.push(newBook);
  await fs.writeFile(bookPath, JSON.stringify(allBooks, null, 2));

  return newBook;
};

const updateById = async (id, data) => {
  const allBooks = await getAll();
  const index = allBooks.findIndex((book) => book.id === id);

  if (index === -1) null;

  allBooks[index] = { id, ...data };

  await fs.writeFile(bookPath, JSON.stringify(allBooks, null, 2));

  return allBooks;
};

const deleteById = async (id) => {
  const allBooks = await getAll();

  const newBooks = allBooks.filter((book) => book.id !== id);

  await fs.writeFile(bookPath, JSON.stringify(newBooks, null, 2));

  return await getAll();
};

module.exports = {
  deleteById,
  updateById,
  getById,
  getAll,
  add,
};
