'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/bookshelf2_test'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/bookshelf2_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
