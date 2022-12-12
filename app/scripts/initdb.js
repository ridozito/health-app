'use strict';

const config = require('../config');
const { Op, Sequelize } = require("sequelize");

// Connect DB
global.__sequelizeMySQL = new Sequelize(
    config.database.mysql.name,
    config.database.mysql.username,
    config.database.mysql.password,
    {
        dialect: 'mysql',
        port: config.database.mysql.port || 3306,
        host: config.database.mysql.host,
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            acquire: 20000,
            evict: 10000
        },
        timezone: config.database.mysql.timezone,
        logging: false,
        query: { raw: true }
    }
);

const DB = require('../models');

const fs = require('fs');
const path = require('path');
const modelsDir = path.normalize(`${__dirname}/../models`);
if (process.argv.includes('index')) {
    fs.readdirSync(modelsDir)
        .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
        .forEach(async (file) => {
            if (!file || file === 'index.js') return;
            const model = require(path.join(modelsDir, file));
            const db = model(global.__sequelizeMySQL, DataTypes);
            const tableName = db.tableName;
            const queryString = `SELECT setval('"${tableName}_id_seq"', (SELECT MAX(id) FROM "${tableName}"));`
            console.log('queryString=', queryString);
            const res = await DB.sequelize.query(queryString, {
                replacements: {
                }, type: DB.sequelize.QueryTypes.SELECT
            });
            console.log('db=', db.tableName, res);
        });
}
