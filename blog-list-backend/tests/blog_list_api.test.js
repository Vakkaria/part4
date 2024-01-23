const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const helper = require('./test_helper')


beforeEach (async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('test of common blogs', () => {
	test('blogs returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

	}, 60000)

	test('all blogs are returned', async () => {
		const blogs = await api.get('/api/blogs')

		expect(blogs.body).toHaveLength(helper.initialBlogs.length)
	})

	test('there are id instead of _id', async () => {
		const blogs = await api.get('/api/blogs')

		expect(blogs.body[0].id).toBeDefined()
		expect(blogs.body[0]._id).not.toBeDefined()
	})

	test('blog are correct added to db', async () => {
		const savedBlog = await api
			.post('/api/blogs')
			.send(helper.blogToAdd)
			.expect(200)

		const blogs = await helper.blogsInDb()

		expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
		expect(savedBlog.body.author).toEqual(helper.blogToAdd.author)
	})

	test('blog are correct delete from db', async () => {
		const blogsBeforeDelete = await helper.blogsInDb()
		const blogForDelete = blogsBeforeDelete[0]

		await api
			.delete(`/api/blogs/${blogForDelete.id}`)
			.expect(204)

		const blogsAfterDelete = await helper.blogsInDb()

		expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1)
		expect(blogsAfterDelete.map(b => b.id)).not.toContain(blogForDelete.id)
	})

	test('likes in blog are correct updated', async () => {
		const blogsBeforeUpdate = await helper.blogsInDb()
		const blogForUpdate = blogsBeforeUpdate.filter(b => b.title === helper.blogForUpdate.title)

		const updatedBlog = await api
			.put(`/api/blogs/${blogForUpdate[0].id}`)
			.send(helper.blogForUpdate)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAfterUpdate = await helper.blogsInDb()

		expect(blogsAfterUpdate).toHaveLength(blogsBeforeUpdate.length)
		expect(updatedBlog.body.likes).toEqual(helper.blogForUpdate.likes)
	})
})

describe('test of exception situations', () => {
	test('blog without likes are correct added to db', async () => {
		const savedBlog = await api
			.post('/api/blogs')
			.send(helper.blogWithoutLikes)

		expect(savedBlog.body.likes).toBeDefined()
		expect(savedBlog.body.likes).toEqual(0)
	})

	test('blog without url or/and blog without title are not added to db', async () => {
		await api
			.post('/api/blogs')
			.send(helper.blogWithoutUrl)
			.expect(400)

		await api
			.post('/api/blogs')
			.send(helper.blogWithoutTitle)
			.expect(400)

		const blogs = await helper.blogsInDb()
		expect(blogs).toHaveLength(helper.initialBlogs.length)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})