require('dotenv').config()

const PORT = process.env.PORT
const MongoUrl = process.env.MONGODB_URL

module.exports = {
	MongoUrl,
	PORT
}