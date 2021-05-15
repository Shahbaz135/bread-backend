'use strict'

// Get dependencies
const express = require('express')
// const socket = require('socket.io')
const http = require('http')
const passport = require('./app/config/passport')
const invoiceService = require(`./app/services/invoice.service`);
const app = express()

const CronJob = require('cron').CronJob;
// Middleware to capture any HTTP responses

app.get('/health', function (req, res) {
  return res.status(200).send('Auth micro-service working 100%... \n 26 October, 2019 - 1:15 PM')
})
global.winston = require('./app/config/winston')
// Initialize Express
require('./app/config/express')(app, passport)

// Initializing socket io
// require('./app/config/socket.config')(app)

// Initializing sequelize
require('./app/config/sequelize.config')

/**
 * Get port from environment and store in Express. 
 */
const port = process.env.PORT || `3000`

// app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)
// const io = socket.listen(server)

// require('./app/config/socket.config')(io)

/**
 * Listen on provided port, on all network interfaces.
 */
console.log('Going to listen on port:', port)
server.listen(port, () => console.log(`API running on localhost:${port}`)).on('error', (error) => {
  console.log(error)
})
console.log('After listen on port:', port)

//// cron scheduler
var date = new Date(), y = date.getFullYear(), m = date.getMonth();
var lastDay = new Date(y, m + 1, 0);

var currentDay = new Date();
currentDay = currentDay.toISOString().split('T')[0];

var job = new CronJob(lastDay, function() {
  console.log(`Generating --- `);
  invoiceService.initiateInvoice();
});

job.start(); 

module.exports = app
