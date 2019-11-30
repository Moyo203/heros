//路由用来分发业务
// 1.引入依赖模块
const fs = require('fs')
const urlModel = require('url')
const path = require('path')
let bindRender = require('./bindRender.js')
let controll = require('./controll.js');
//路由分配
function router(req, res) {
    let method = req.method;
    let urlObj = urlModel.parse(req.url, true)
    let pathname = urlObj.pathname
    //把pathname挂载到res上
    res.pathname = pathname;

    if (method == 'GET' && (pathname == '/' || pathname == "/index" || pathname == "/index.html")) {
        controll.showIndexPage(req,res)
    } else if (method == 'GET' && pathname == '/add.html') {
        controll.showAddPage(req,res)
    } else if (method == 'GET' && pathname == '/info.html') {
        controll.showInfoPage(req,res) 
    } else if (method == 'GET' && pathname == '/edit.html') {
        controll.showEditPage(req, res) 
    } else if(method == 'POST' && pathname == '/addHeroInfo'){
        controll.addHeroInfo(req,res)
    }else if (method == 'GET' && pathname.startsWith('/node_modules')) {
        controll.loadStaticSource(req,res) 
    } else {
        let obj = {
            code: 404,
            msg: '页面不存在，拜拜'
        }
        res.end(JSON.stringify(obj))
    }
}

//将方法暴露
module.exports = router