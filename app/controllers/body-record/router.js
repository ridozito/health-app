'use strict';

const {
    isAuthenticated
} = require('../../middleware/auth');
const BodyRecordController = require('./body-record.controller');

module.exports = {
    baseUrl: '/body-records',
    default: [
        {
            method: 'GET',
            route: '/',
            handlers: [
                isAuthenticated,
                BodyRecordController.get
            ]
        }
       
    ]
}