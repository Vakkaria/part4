const express = require('express')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(middleware.morganTiny)

logger.info('Connecting to MongoDB...')
mongoose.connect(config.MongoUrl)
	.then(() => {
		logger.info('successful connected to MongoDB')
	})
	.catch(error => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app