//路由
// 1.引入依赖模块
const fs = require('fs')
const urlModel = require('url')
const path = require('path')
let bindRender = require('./bindRender.js')

//路由分配
function router(req, res) {
    let method = req.method;
    let urlObj = urlModel.parse(req.url, true)
    let pathname = urlObj.pathname

    if (method == 'GET' && (pathname == '/' || pathname == "/index" || pathname == "/index.html")) {
        fs.readFile(path.join(__dirname, './views/index.html'), 'utf-8', (err, data) => {
            fs.readFile(path.join(__dirname, './hero.json'), 'utf8', (err, data) => {
                if (err) return console.log(err.message);
                let herosArr = JSON.parse(data)
                let obj = {
                    data: herosArr
                }
                res.render('index', obj)
            })
        })
    } else if (method == 'GET' && pathname == '/add.html') {
        res.render('add', {})
    } else if (method == 'GET' && pathname == '/info.html') {
        res.render('info', {})
    } else if (method == 'GET' && pathname == '/edit.html') {
        res.render('edit', {})
    } else if (method == 'GET' && pathname == '/node_modules/bootstrap/dist/css/bootstrap.css') {
        fs.readFile(path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.css'), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            res.end(data);
        })
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