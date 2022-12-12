'use strict';

const {
    isAuthenticated
} = require('../../middleware/auth');
const MealHistoryController = require('./meal-history.controller');

module.exports = {
    baseUrl: '/meal-histories',
    default: [
        {
            method: 'GET',
            route: '/',
            handlers: [
                // isAuthenticated,
                MealHistoryController.get
            ]
        }
       
    ]
}