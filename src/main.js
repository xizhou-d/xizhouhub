const app = require('./app/index.js')
const { SERVER_PORT } = require('./config/server.js')
require('./utils/handle-error.js')

app.listen(SERVER_PORT, () => {
    console.log("koa 服务器启动了～")
})

