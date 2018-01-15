module.exports = runQuery => {
  /**
   * verifyTable - Verify if a table exists and create it if it doesn't.
   *             - Will also fix tables with missing columns.
   *
   * @return Void  Fixes or creates missing/outdated tables.
   */
  function verifyTable() {
    return runQuery('SELECT * FROM users;')
      .then(res => console.log('Table validated', res))
      .catch(createNonExistentTable);
  }

  /**
   * createNonExistentTable - Creates a non-existent table based on provided schema.
   *
   * @return Void  Creates the table.
   */
  function createNonExistentTable() {
    console.log('creating table.');
    return runQuery(`CREATE TABLE IF NOT EXISTS users (
      user_id integer NOT NULL,
      email varchar(250) NOT NULL,
      password varchar(450) NOT NULL,
      verified integer NOT NULL DEFAULT '1',
      PRIMARY KEY (user_id)
    )`)
    .then(res => console.log('Created users', res))
    .catch(err => console.error('Creation error', err));
  }

  return {
    verifyTable,
  };
};
