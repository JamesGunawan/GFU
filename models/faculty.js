import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import bcrypt from "bcrypt";

const Faculty = sequelize.define('Faculty', {
    faculty_id: {
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
        beforeSave: async (faculty) => {
            const first_initial = faculty.first_name[0].toLowerCase();
            const last_name = faculty.last_name.toLowerCase();

            // Use a temporary faculty_id if it's not yet available
            let faculty_id = faculty.faculty_id;

            // Generate a temporary username based on first initial and last name
            faculty.username = `${first_initial}${last_name}@faculty.gfu.edu`;

            // Add the logic to handle when faculty_id is available after insertion
            if (faculty_id) {
                faculty.username = `${first_initial}${last_name}${faculty_id}@faculty.gfu.edu`;
            }

            // Hash the password before saving
            if (faculty.password) {
                const salt = await bcrypt.genSalt(10);
                faculty.password = await bcrypt.hash(faculty.password, salt);
            }
        },
        afterSave: async (faculty) => {
            // Update username after the faculty has been saved and faculty_id is available
            if (faculty.faculty_id && !faculty.username.includes(faculty.faculty_id)) {
                const first_initial = faculty.first_name[0].toLowerCase();
                const last_name = faculty.last_name.toLowerCase();
                faculty.username = `${first_initial}${last_name}${faculty.faculty_id}@faculty.gfu.edu`;

                // Update the record in the database
                await faculty.update({ username: faculty.username });
            }
        }
    } 
});

export default Faculty;