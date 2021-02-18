const {gql} = require('apollo-server-azure-functions')

const typeDefs = gql`
	scalar Date

	type Post {
		title: String!
		date: Date!
		publish: Date!
		slug: ID!
		blogs: [String]
		description: String!
		categories: [String]
		featured: String!
		content: String!
		excerpt: String
	}

	type Query {
		posts(blog: String, category: String): [Post]
		post(slug: ID): Post
	}
`

module.exports = typeDefs