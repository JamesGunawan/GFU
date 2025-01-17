import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
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
    adress: {
        type: DataTypes.STRING(255),
    },
    phone : {
        type: DataTypes.STRING(20),
    },
    enrollment_status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
    }
}, {
    hooks: {
        beforeCreate: async (student) => {
          const first_inital = student.first_name[0].toLowerCase();
          const last_name = student.last_name.toLowerCase();
          const student_id = student.student_id;
    
          student.username = `${first_inital}${last_name}${student_id}@student.gfu.edu`;
        }
    }
});

export default Student;