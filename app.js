// 引入模块
const http = require('http')
const fs = require('fs')
const path = require('path')
const urlModel = require('url')
// const querystring = require('querystring')
// const template = require('art-template')
const bindRender = require('./bindRender');
const router = require('./router.js');

//创建服务器对象
let app = http.createServer();
//监听端口
app.listen(3008, () => {
    console.log('server is running at http://127.0.0.1:3008');
})

//注册事件，监听请求
app.on('request', (req, res) => {
   
    bindRender(req, res);
    router(req, res);

})