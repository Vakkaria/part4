const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
]

const listBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]

describe('dummy', () => {
	test('dummy returns one', () => {
		const blogs = []

		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	})
})

describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('when list has zero blogs, returned value is zero too', () => {
		const result = listHelper.totalLikes([])
		expect(result).toBe(0)
	})

	test('when list have a lot of blogs, equals the sum of the likes these blogs', () => {
		const result = listHelper.totalLikes(listBlogs)
		expect(result).toBe(36)
	})
})

describe('favorite blog', () => {
	test('when list has zero blogs, return zero', () => {
		const result = listHelper.favoriteBlog([])
		expect(result).toBe(0)
	})

	test('when list has only one blog, return the blog', () => {
		const result = listHelper.favoriteBlog(listWithOneBlog)
		expect(result).toEqual(listWithOneBlog[0])
	})

	test('when list has a lot of blogs, return the blog that have the biggest likes', () => {
		const result = listHelper.favoriteBlog(listBlogs)
		expect(result).toEqual(listBlogs[2])
	})
})

describe('most likes', () => {
	test('when list has a lot of blogs, return the function returns the author,\nwhose blog posts have the largest amount of likes.', () => {
		const result = listHelper.mostLikes(listBlogs)
		const expectedResult = {
			author: 'Edsger W. Dijkstra',
			likes: 17
		}
		expect(result).toEqual(expectedResult)
	})

	test('when list has a empty array, return undefined', () => {
		const result = listHelper.mostLikes([])
		expect(result).toEqual(undefined)
	})

	test('when list have only one object, return author and like of the title of object', () => {
		const result = listHelper.mostLikes(listWithOneBlog)
		const expectedResult = {
			author: 'Edsger W. Dijkstra',
			likes: 5
		}
		expect(result).toEqual(expectedResult)
	})
})

describe('most blogs', () => {
	test('when list have a lot of object, return author and count of blogs', () => {
		const result = listHelper.mostBlogs(listBlogs)
		const expectedResult = {
			author: 'Robert C. Martin',
			blogs: 3
		}
		expect(result).toEqual(expectedResult)
	})

	test('when list is empty, return empty author and zero blogs', () => {
		const result = listHelper.mostBlogs([])
		const expectedResult = {
			author: '',
			blogs: 0
		}
		expect(result).toEqual(expectedResult)
	})

	test('when list has only one element, return own author and count of blogs equal 1', () => {
		const result = listHelper.mostBlogs(listWithOneBlog)
		const expectedResult = {
			author: 'Edsger W. Dijkstra',
			blogs: 1
		}
		expect(result).toEqual(expectedResult)
	})
})