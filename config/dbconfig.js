import { Sequelize } from "sequelize"; // Import Sequelize module 
import dotenv from "dotenv"; // Import dotenv configs 

dotenv.config(); // Load environment variables from .env file

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
)

export default sequelize; // Export the Sequelize instance