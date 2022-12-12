'use strict';

const {
    isAuthenticated
} = require('../../middleware/auth');
const DiaryController = require('./diary.controller');

module.exports = {
    baseUrl: '/diaries',
    default: [
        {
            method: 'GET',
            route: '/',
            handlers: [
                isAuthenticated,
                DiaryController.get
            ]
        }
       
    ]
}