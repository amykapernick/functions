const ogs = require('open-graph-scraper')

const addResource = async ({database, notion, body}) => {
	const image = await ogs({ url: body.url }).then(data => data?.result)
	const imageUrl = image?.ogImage?.url || image?.twitterImage?.url || false
	const children = []

	if(imageUrl) {
		children.push({
			object: 'block',
			type: 'image',
			image: {
				type: "external",
				external: {
					url: imageUrl
				}
			}
		})
	}

	console.log({children, image, imageUrl})

	const data = await notion.pages.create({
		parent: {
			database_id: database
		},
		properties: {
			URL: {
				url: body.url
			  },
			  Name: {
				  title: [
					  {
						  text: {
							  content: body.title,
						  },
					  }
				  ]
			  }
		},
		children
	}).then(res => res).catch((err) => err)

	return data
}

module.exports = addResource