
module.exports = function (app) {
  // const dbPath = app.get('nedb');
  // const Model = new NeDB({
  //   filename: path.join(dbPath, 'users.db'),
  //   autoload: true
  // });

  // Model.ensureIndex({ fieldName: 'email', unique: true });

  // return Model;
  const db = app.get('knexClient');
  const tableName = 'users';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('email');
        table.unique('email');
        table.string('password');
        table.string('avatar');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });
  
  return db;
};
