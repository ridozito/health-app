"use strict";
const {faker} = require("@faker-js/faker");
const utils = require("../common/utils");
const config = require("../config");
const { Op, Sequelize } = require("sequelize");

// Connect MySQL
global.__sequelizeMySQL = new Sequelize(config.database.mysql.name, config.database.mysql.username, config.database.mysql.password, {
  dialect: "mysql",
  port: config.database.mysql.port || 3306,
  host: config.database.mysql.host,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000,
    evict: 10000,
  },
  timezone: config.database.mysql.timezone,
  logging: false,
  query: { raw: true },
});
const {users, body_record,diary,excercise_history,meal_history} = require("../models");

const initData = async () => {
  let promiseAll = [];
  promiseAll.push(
    users.create({
      id: 1,
      email: "user1@healthapp.com",
      name: "User1",
      password: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
      sex: "male",
    })
  );

  const bodyRecords = [],
    diaries = [],
    mealHistories = [],
    excerciseHistories = [];
  for (let i = 0; i < 20; i++) {
    bodyRecords.push({
      user_id: 1,
      weight: utils.generateRandom(50, 70),
      body_fat: utils.generateRandom(15, 25),
    });
    diaries.push({
      user_id: 1,
      content: faker.lorem.paragraph(),
    });
    mealHistories.push({
      user_id: 1,
      type: utils.generateRandom(1, 4),
      image: faker.image.food(),
      description: faker.random.word(),
    });
    excerciseHistories.push({
      user_id: 1,
      title: faker.random.word(),
      kcal: utils.generateRandom(100, 300),
      duration: utils.generateRandom(10, 60),
    });
  }
  promiseAll.push(body_record.bulkCreate(bodyRecords));
  promiseAll.push(diary.bulkCreate(diaries));
  promiseAll.push(meal_history.bulkCreate(mealHistories));
  promiseAll.push(excercise_history.bulkCreate(excerciseHistories));
  await Promise.all(promiseAll);
  console.log("init dummy data finished!");
};

 initData();
