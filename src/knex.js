const knex = require('knex');

module.exports = function (app) {
  const db = knex({
    client: 'mssql',
    connection: {
      host : '127.0.0.1',
      user: 'username',
      password: 'password',
      database: 'database',
      options: {
        encrypt: true,
      }
    }
  });

  app.set('knexClient', db);
};
