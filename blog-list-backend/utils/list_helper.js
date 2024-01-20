const lodash = require('lodash')

const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
	let theFavoriteBlog = blogs.length === 0
		? 0
		: blogs[0]

	blogs.forEach(blog => {
		if (blog.likes > theFavoriteBlog.likes) {
			theFavoriteBlog = blog
		}
	})

	return theFavoriteBlog
}

const mostLikes = blogs => {
	if(blogs.length === 0) {
		return undefined
	}

	let countLikes = 0
	const theMostLikes = lodash.maxBy(blogs, 'likes')

	lodash.forEach(blogs, blog => {
		if (blog.author === theMostLikes.author) {
			countLikes += blog.likes
		}
	})

	return {
		author: theMostLikes.author,
		likes: countLikes
	}
}

const mostBlogs = blogs => {
	let max = 0
	let maxAuthor = ''
	const arrayAuthors = lodash.uniqBy(blogs, 'author')

	lodash.forEach(arrayAuthors, author => {

		if (blogs.filter(b => b.author === author.author).length > max) {
			max = blogs.filter(b => b.author === author.author).length
			maxAuthor = author.author
		}
	})

	return {
		author: maxAuthor,
		blogs: max
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostLikes,
	mostBlogs
}