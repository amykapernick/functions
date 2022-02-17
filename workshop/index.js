const fetchResources = require("../utils/notion/fetchResources")

module.exports = async function (context, req) {
    const { Client } = require("@notionhq/client")
    const notion = new Client({
        auth: process.env.NOTION_API
    })

    let data

    const {method, query: {section}} = req

    console.log({method, section})

    if(method == 'GET'){
        let database

        switch(section) {
            case 'html':
                database = process.env.DATABASE_HTML
                break;
            case 'css':
                database = process.env.DATABASE_CSS
                break;
            case 'a11y':
                database = process.env.DATABASE_A11Y
                break;
            case 'vr':
                database = process.env.DATABASE_VR
                break;
            case 'ui':
                database = process.env.DATABASE_UI
                break;
        }

        data = await fetchResources({
            database,
            notion
        }).then(res => res).catch((err) => err)
    }


    context.res = {
        headers: {
            "Content-Type": "application/json"
        },
        body: {data}
    }
    
}