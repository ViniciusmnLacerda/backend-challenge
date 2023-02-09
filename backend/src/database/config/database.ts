import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: 'MAX_MILHAS',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3002,
  dialect: 'mysql',
  dialectOptions: {
    timezone: '-03:00',
    dateStrings: true,
    typeCast: true,

  },
  timezone: "-03:00",
  logging: false,
}

module.exports = config;
