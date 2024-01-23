const Blog = require('../models/blogs')

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5
	},
	{
		title: 'Crime and Punishment',
		author: 'Fyodor Dostoevsky',
		url: 'https://books.com/Fyodor_Dostoevsky/Crime_and_Punishment',
		likes: 158
	}
]

const blogToAdd = {
	title: 'Crime and Punishment',
	author: 'Fyodor Dostoevsky',
	url: 'https://books.com/Fyodor_Dostoevsky/Crime_and_Punishment',
	likes: 158
}

const blogWithoutLikes = {
	title: 'Yandex is shit',
	author: 'Ilya Oblomov',
	url: 'https://habr.com/yandex_is_shit'
}

const blogWithoutUrl = {
	title: 'Yandex is shit',
	author: 'Ilya Oblomov',
	likes: 37
}

const blogWithoutTitle = {
	author: 'Ilya Oblomov',
	url: 'https://habr.com/yandex_is_shit',
	likes: 37
}

const blogForUpdate = {
	title: 'React patterns',
	author: 'Michael Chan',
	url: 'https://reactpatterns.com/',
	likes: 59
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, blogToAdd, blogWithoutLikes, blogWithoutUrl,
	blogWithoutTitle, blogForUpdate, blogsInDb
}