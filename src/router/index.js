const fs = require('fs')
const { allowedMethods } = require('./login.router')

function registerRouters(app) {
    // 1. 读取当前文件夹下的所有文件
    const files = fs.readdirSync(__dirname)

    for (const file of files) {
        if (!file.endsWith('.router.js')) continue
        const router = require(`./${file}`)

        app.use(router.routes())
        app.use(allowedMethods())
    }
}

module.exports = {
    registerRouters
}