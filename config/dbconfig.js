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
);

// Check database connection
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
}

export default sequelize; // Export the Sequelize instance