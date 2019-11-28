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
    
    }
}