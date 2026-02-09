const createConnectorPool = require('./knexfile.js');
const {Model} = require('objection');

async function setupDb() {
    const config = {pool: {}};
    
    config.pool.max = 10;
    // 'min' is the minimum number of idle connections Knex maintains in the pool.
    // Additional connections will be established to meet this value unless the pool is full.
    config.pool.min = 5;

    // 'acquireTimeoutMillis' is the number of milliseconds before a timeout occurs when acquiring a
    // connection from the pool. This is slightly different from connectionTimeout, because acquiring
    // a pool connection does not always involve making a new connection, and may include multiple retries.
    // when making a connection
    config.pool.acquireTimeoutMillis = 60000; // 60 seconds
    // 'createTimeoutMillis` is the maximum number of milliseconds to wait trying to establish an
    // initial connection before retrying.
    // After acquireTimeoutMillis has passed, a timeout exception will be thrown.
    config.pool.createTimeoutMillis = 30000; // 30 seconds
    // 'idleTimeoutMillis' is the number of milliseconds a connection must sit idle in the pool
    // and not be checked out before it is automatically closed.
    config.pool.idleTimeoutMillis = 600000; // 10 minutes

    config.pool.createRetryIntervalMillis = 200; // 0.2 seconds

    const db = await createConnectorPool(config)
    console.log('db connection created')
    Model.knex(db);
    console.log('model binded')
    return
}

module.exports = setupDb;