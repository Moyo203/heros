// 引入模块
const template = require('art-template');
const path = require('path');

// 自定义方法
function bindRender(req,res){
    res.render = function(filename,obj){
        let str = template(path.join(__dirname,'./views/'+filename+'.html'),obj)
        res.end(str)
    }
}

//将方法暴露出去
module.exports = bindRender;
