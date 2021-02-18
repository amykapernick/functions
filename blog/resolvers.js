const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')
const fetch = require('node-fetch')

const feed = process.env.BLOG_FEED 

const resolvers = {
	Query: {
		posts: async (obj, {blog, category}) => {
			let results = await fetch(feed).then(res => res.json()).then(res => res.items)

			if(blog) {
				results = results.filter((post) => post.blogs.some(i => i.toLowerCase() == blog.toLowerCase()))
			}

			if(category) {
				results = results.filter((post) => post.categories.some(i => i.toLowerCase() == category.toLowerCase()))
			}

			return results
		},
		post: async (obj, {slug}) => {
			const results = await fetch(feed).then(res => res.json()).then(res => res.items)

			return results.find((post) => post.slug === slug)
		},
	},
	Date: new GraphQLScalarType({
		name: `Date`,
		description: 'This is a proper date',
		parseValue(value) {
			// value from the client
			// console.log(value)
			return new Date(value)
		},
		serialize(value) {
			// value sent to the client
			return new Date(value)
		},
		parseLiteral(ast) {
			if(ast.kind === Kind.INT) {
				return new Date(ast.value)
			}
			return null
		}
	})
}

module.exports = resolvers