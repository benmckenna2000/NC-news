const ENV = process.env.NODE_ENV || 'development';
const { DB_URL } = process.env;

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  development: {
    connection: {
      database: 'nc_news',
      username: 'ben',
      password: 'password'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: 'ben',
      password: 'password'
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
