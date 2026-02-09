'use strict';
// [START cloud_sql_postgres_knex_connect_connector]
const Knex = require('knex');
const {Connector} = require('@google-cloud/cloud-sql-connector');

// connectWithConnector initializes connection pool for a Cloud SQL instance
// of Postgres using the Cloud SQL Node.js Connector.
const connectWithConnector = async config => {
  // Note: Saving credentials in environment variables is convenient, but not
  // secure - consider a more secure solution such as
  // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
  // keep secrets safe.
  const connector = new Connector();
  const clientOpts = await connector.getOptions({
    instanceConnectionName: 'lolbile-cloud-project:europe-west9:lolbile',
    ipType: 'PUBLIC',
  });
  const dbConfig = {
    client: 'pg',
    connection: {
      ...clientOpts,
      user: 'postgres', // e.g. 'my-user'
      password: 'postgres', // e.g. 'my-user-password'
      database: 'lolbile', // e.g. 'my-database'
    },
    // ... Specify additional properties here.
    migrations: {
      tableName: 'knex_migrations'
    },
    ...config,
  };
  // Establish a connection to the database.
  return Knex(dbConfig);
};
// [END cloud_sql_postgres_knex_connect_connector]
module.exports = connectWithConnector;


