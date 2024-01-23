require('dotenv').config()

const PORT = process.env.PORT

const MongoUrl = process.env.NODE_ENV === 'test'
	? process.env.TEST_MONGODB_URL
	: process.env.MONGODB_URL


module.exports = {
	MongoUrl,
	PORT
}