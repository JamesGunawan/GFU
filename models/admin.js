import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import bcrypt from "bcrypt";

const Admin = sequelize.define('Admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {    
    // Hash the password before saving
    hooks: {
        beforeCreate: async (admin) => {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(admin.password, salt);
        }
    }
});

export default Admin;