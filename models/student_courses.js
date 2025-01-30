import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import Student from "./students.js";
import Course from "./courses.js";

const StudentCourse = sequelize.define('StudentCourse', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Student,
            key: 'student_id'
        }
    },
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Course,
            key: 'course_id'
        }
    },
    enrollment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('enrolled', 'dropped', 'graduated'),
        defaultValue: 'unavailable',
    }
}); 

export default StudentCourse;