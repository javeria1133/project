// Import required modules
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Express app
const app = express();

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost', // Default host
    dialect: 'postgres', // PostgreSQL database
});

// Define a basic "users" table directly in the code
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
});

// Test database connection Verifies the connection to the database using the credentials provided.
sequelize.authenticate()
    .then(() => console.log('Database connection established successfully.'))
    .catch(err => console.error('Database connection failed:', err));

// Sync the database
sequelize.sync({ force: true }) // Force: true resets the table on every run (use only for development)
    .then(() => console.log('Database synchronized!'))
    .catch(err => console.error('Database sync failed:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})