'use strict';

const express = require('express');
const knex = require('../knex.js');

// eslint-disable-next-line new-cap
const router = express.Router();
const { camelizeKeys, decamelizeKeys } = require('humps')

// YOUR CODE HERE
router.get('/books', (req,res,next) => {

    return knex('books')
    .select('updated_at AS updatedAt', 'cover_url AS coverUrl', 'created_at AS createdAt', 'id AS id', 'description AS description', 'title AS title', 'genre AS genre', 'author AS author')
    .orderBy('title')
    .then((data) => res.status(200).send(data))

})

router.get('/books/:id', (req,res,next) => {
  const id = req.params.id
  return knex('books')
  .where('id', id)
  .first('updated_at AS updatedAt', 'cover_url AS coverUrl', 'created_at AS createdAt', 'id AS id', 'description AS description', 'title AS title', 'genre AS genre', 'author AS author')
  .then((data) => res.status(200).send(data))
})

router.post('/books', (req,res,next) => {
  // console.log(req.body.coverUrl);
  const {title, author, genre, description, coverUrl} = req.body
  const insertBook = {title, author, genre, description, coverUrl}
  return knex('books').insert(decamelizeKeys(insertBook), '*')

  .then((data) => {
  const result = camelizeKeys(data[0])
  res.status(200).send(result)
  })
})

router.patch('/books/:id', (req,res,next) => {

  // console.log(req.params.id);
  const id = req.params.id
  const {title, author, genre, description, coverUrl} = req.body
  const updateBook = {title, author, genre, description, coverUrl}

  return knex('books')
  .where('id' , id)
  .update(decamelizeKeys(updateBook),'*')

  .then((data) => {
  const result = camelizeKeys(data[0])
  res.status(200).send(result)
  })

})

router.delete('/books/:id',(req, res, next) => {
  const id = req.params.id;

  return knex('books')
  .where('id' , id)
  .del()
  .first('updated_at AS updatedAt', 'cover_url AS coverUrl', 'created_at AS createdAt', 'description AS description', 'title AS title', 'genre AS genre', 'author AS author')

  .then((result) => {
  res.status(200).send(result)
  })
})

module.exports = router;
