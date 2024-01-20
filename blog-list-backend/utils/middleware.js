const morgan = require('morgan')

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unknown Endpoint' })
}

const morganTiny = morgan('tiny')

module.exports = {
	morganTiny,
	unknownEndpoint
}