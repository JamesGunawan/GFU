import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig.js";
import Student from "./students.js";
import Course from "./courses.js";

const Payment = sequelize.define('Payments', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: sequelize.models.Student, // Had to use cuz of how Sequelize handles model associations and circular dependencies.
            key: 'student_id'
        }
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Course,
            key: 'course_id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    paid_at: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.ENUM('paid', 'pending'),
        allowNull: false,
        defaultValue: 'pending'
    },
}, {
    hooks: {
        beforeUpdate: (payment) => {
            // Ensure 'paid_at' is only set when the status is 'paid'
            if (payment.status === 'paid' && !payment.paid_at) {
                payment.paid_at = new Date();
            }
        },
    },
});

export default Payment;