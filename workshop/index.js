const fetchResources = require("../utils/notion/fetchResources")
const addResource = require("../utils/notion/addResource")
const formatData = require("../utils/formatFormData")

module.exports = async function (context, req) {
    const { Client } = require("@notionhq/client")
    const notion = new Client({
        auth: process.env.NOTION_API
    })

    let data

    const { method, query: { section }, body } = req

    let database
    let formData
    let response = {}

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

    if(method == 'GET'){
        data = await fetchResources({
            database,
            notion
        }).then(res => res).catch((err) => err)

        response.status = 200
        response.body = {data}
        response.headers = {"Content-Type": "application/json"}
    }
    else if(method == 'POST') {
        formData = formatData(decodeURIComponent(body).split(`&`))
        data = await addResource({
            database,
            notion,
            body: formData
        }).then(res => res).catch((err) => err)

        response.status = 302
        response.body = {}
        response.headers = {Location: formData.redirect}
    }

    console.log(formData)

    context.res = response

    context.done()
    
}