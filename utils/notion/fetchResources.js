const fetchResources = async ({database, notion}) => {
	const data = await notion.databases.query({
        database_id: database
    }).then((res) => res).catch((err) => err)

		// console.log(res)
	const pageData = Promise.all(
		data.results.map(async (page) => {
			const pageData = await notion.blocks.children.list({
				block_id: page.id,
				page_size: 10
			})

			return {...page, blocks: pageData}
		})
	)

	return pageData
}

module.exports = fetchResources