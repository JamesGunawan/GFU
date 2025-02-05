import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import bcrypt from "bcrypt";

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(100),
        defaultValue: 'temporary username',
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
        beforeSave: async (student) => {
          const first_initial = student.first_name[0].toLowerCase();
          const last_name = student.last_name.toLowerCase();
      
          // Use a temporary student_id if it's not yet available
          let student_id = student.student_id;
      
          // Generate a temporary username based on first initial and last name
          student.username = `${first_initial}${last_name}@student.gfu.edu`;
      
          // Add the logic to handle when student_id is available after insertion
          if (student_id) {
            student.username = `${first_initial}${last_name}${student_id}@student.gfu.edu`;
          }
      
          // Only hash the password if it is new or changed
          if (student.password && student.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(student.password, salt);
          }
        },
        afterSave: async (student) => {
          // Update username after the student has been saved and student_id is available
          if (student.student_id && !student.username.includes(student.student_id)) {
            const first_initial = student.first_name[0].toLowerCase();
            const last_name = student.last_name.toLowerCase();
            student.username = `${first_initial}${last_name}${student.student_id}@student.gfu.edu`;
      
            // Update the record in the database
            await student.update({ username: student.username });
          }
        }
      }      
});

export default Student;