'use strict';

const fs = require('fs');
const path = require('path');
const {
    Sequelize,
    DataTypes
} = require('sequelize');
const modelsDir = path.normalize(`${__dirname}/../models`);
const db = {};

(async function () {
    try {
        await global.__sequelizeMySQL.authenticate();
    } catch (error) {
        console.error('\x1b[31m', 'Unable to connect to the database:', error);
    }
}());

fs.readdirSync(modelsDir)
    .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
    .forEach((file) => {
        if (file && file !== 'index.js') {
            const model = require(path.join(modelsDir, file));
            const modelFinal = model(global.__sequelizeMySQL, DataTypes);
            db[modelFinal.name] = modelFinal;
        }
    });

if (process.argv.includes('--initdb')) {
    // Synchronizing any model changes with database.
    global.__sequelizeMySQL
        .sync()
        .then(() => {
            console.log('Database synchronized');
        })
        .catch((error) => {
            if (error) {
                console.log('An error occured:', error);
            }
        });
}

module.exports = {
    sequelize: __sequelizeMySQL,
    Sequelize,
    ...db
};
