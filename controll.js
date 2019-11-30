// 控制器用来处理路由发来的业务逻辑
// 1.引入依赖模块
const fs = require('fs')
const path = require('path')
let bindRender = require('./bindRender.js')
let modelData = require('./modelData.js')
const urlModel = require('url');
const querystring = require('querystring')

//业务处理
// 暴露出来里面的多个函数
module.exports = {
    // 显示index页面
    showIndexPage(req, res) {
        fs.readFile(path.join(__dirname, './views/index.html'), 'utf-8', (err, data) => {
          
           modelData.getAllHeroData(function(err,data){
            if (err) res.end('404')
            let herosArr = JSON.parse(data)
            let obj = {
                data: herosArr
            }
            res.render('index', obj)
           })
           
        })
    },

    // 显示编辑页面
    showEditPage(req, res) {
        res.render('edit', {})
    },

    //显示信息info界面
    showInfoPage(req,res){
        //查看URL里面的属性
        let urlObj = urlModel.parse(req.url,true)
        let id = urlObj.query.id;
        // console.log(id);
        modelData.getOneHeroInfo(id,function(err,obj){
            if(err) res.end('404');
            res.render('info',obj)
        })
        // res.render('info', {})

    },

    //显示新增add界面
    showAddPage(req,res){
        res.render('add', {})
    },

    //添加英雄数据
    addHeroInfo(req,res){
        //先写post所需的两个方法
        let str = '';
        req.on('data',chunk=>{
            str += chunk;
        })
        req.on('end',()=>{
            // 因为前面使用了serialize方法将数据转为序列字符串
            //所以这里使用querystring.parse将其转换为对象
            let heroInfo = querystring.parse(str);
            modelData.addHeroInfo(heroInfo,(result)=>{
                res.writeHeader(200,{
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                if(result) return res.end(JSON.stringify({
                    code: 200,
                    msg: '添加成功'
                }))

                res.end(JSON.stringify({
                    code: 201,
                    msg: '添加失败'
                }))
            })
        })

    },
    //加载静态资源例如：css、javascript
    loadStaticSource(req,res){
        // 这里css\javascript都会加载
        fs.readFile(path.join(__dirname, res.pathname), 'utf8', (err, data) => {
            if (err) return console.log(err.message);
            //这里给css的情况添加响应头
            if(res.pathname.endsWith('.css')){
                //设置响应头
                res.writeHeader(200,{
                    'Content-Type': 'text/css;charset=utf-8'
                })
            }res.end(data);
        })
    }
 

}