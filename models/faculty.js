import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

const Faculty = sequelize.define('Faculty', {
    faculty_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING(255),
        allowNull: false
    },
},  {
    hooks: {
        beforeCreate: async (faculty) => {
          const first_inital = faculty.first_name[0].toLowerCase();
          const last_name = faculty.last_name.toLowerCase();
          const faculty_id = faculty.faculty_id;
    
          faculty.username = `${first_inital}${last_name}${faculty_id}@faculty.gfu.edu`;
        }
    }
});

export default Faculty;