import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import Student from "./students.js";
import Course from "./courses.js";

const StudentCourse = sequelize.define('StudentCourse', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    enrollment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('enrolled', 'dropped', 'graduated', 'unavailable'),
        defaultValue: 'unavailable',
    }
}); 

// Define associations after all models are defined
StudentCourse.associate = function(models) {
    StudentCourse.belongsTo(models.Course, { foreignKey: 'course_id' });
    StudentCourse.belongsTo(models.Student, { foreignKey: 'student_id' });
};

export default StudentCourse;