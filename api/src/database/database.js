import { Sequelize } from "sequelize";
import { config } from "dotenv";
import pg from "pg";
config();
const DATABASE_URL = process.env.DATABASE_URL;

// ============================================================================
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectModule: pg,
});
export default sequelize;
