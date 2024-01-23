const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	if (!body.url || !body.title) {
		return response.status(400).json({ error: 'Missing url or/and title fields' })
	}

	const blog = new Blog ({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
			? body.likes
			: 0
	})
    
	const newBlog = await blog.save()
	response.json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const blogObject = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogObject, { new: true })
	response.json(updatedBlog)
})

module.exports = blogsRouter