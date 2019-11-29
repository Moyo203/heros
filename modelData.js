//model 数据处理模块，用来处理数据，读取数据
// 1.引入依赖模块
const fs = require('fs')
const path = require('path')
// const moment = require('moment')

//数据处理
//暴露模块中的函数

module.exports = {

    //获取英雄全部信息
    getAllHeroData(callback){
         fs.readFile(path.join(__dirname, './hero.json'), 'utf8', (err, data) => {
            if (err) return callback(err);
            callback(null,data);
           
        })
    },

    getOneHeroInfo(id,callback){
        this.getAllHeroData(function(err,data){
            if (err) return callback(err);
            //将json中的字符串数组转成真正的数组
            let heroInof = JSON.parse(data);
            //这里定义obj对象来接收下面的数据
            let obj;
            //some方法数组的遍历，查找匹配项是否存在
            heroInof.some(function(item){
                if(id == item.id){
                    obj = item;
                    //根据匹配到的id从而将整个对象传给obj
                }
            })
            callback(null,obj);
        })



        
    }
}