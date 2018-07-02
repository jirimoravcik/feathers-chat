module.exports = function (app) {
  // const dbPath = app.get('nedb');
  // const Model = new NeDB({
  //   filename: path.join(dbPath, 'messages.db'),
  //   autoload: true
  // });

  // return Model;

  const db = app.get('knexClient');
  const tableName = 'messages';
  db.schema.hasTable(tableName).then(exists => {
    if(!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('text');
        table.dateTime('created_at').defaultTo(db.fn.now());
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
