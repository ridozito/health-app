'use strict';

const {
    isAuthenticated
} = require('../../middleware/auth');
const ExcerciseHistoryController = require('./excercise-history.controller');

module.exports = {
    baseUrl: '/excercise-histories',
    default: [
        {
            method: 'GET',
            route: '/',
            handlers: [
                isAuthenticated,
                ExcerciseHistoryController.get
            ]
        }
       
    ]
}