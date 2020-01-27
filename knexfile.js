module.exports = {
  development: {
    client: 'mysql',
    version: '8.0.16',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'kainat',
      database : 'Test'
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    },
  //   log: {
  //     warn(message) {
  //     },
  //     error(message) {
  //     },
  //     deprecate(message) {
  //     },
  //     debug(message) {
  //     },
  // }
}
}
