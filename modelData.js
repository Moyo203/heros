//model 数据处理模块，用来处理数据，读取数据
// 1.引入依赖模块
const fs = require('fs')
const path = require('path')
const moment = require('moment')

//数据处理
//暴露模块中的函数

module.exports = {

    //获取英雄全部信息
    getAllHeroData(callback) {
        fs.readFile(path.join(__dirname, './hero.json'), 'utf8', (err, data) => {
            if (err) return callback(err);
            callback(null, data);

        })
    },
    // 获取单个数据
    getOneHeroInfo(id, callback) {
        this.getAllHeroData(function (err, data) {
            if (err) return callback(err);
            //将json中的字符串数组转成真正的数组
            let heroInof = JSON.parse(data);
            //这里定义obj对象来接收下面的数据
            let obj;
            //some方法数组的遍历，查找匹配项是否存在
            heroInof.some(function (item) {
                if (id == item.id) {
                    obj = item;
                    //根据匹配到的id从而将整个对象传给obj
                }
            })
            callback(null, obj);
        })
    },
    //heroInfo是新数据，heroArr是总数据
    // 添加数据
    addHeroInfo(heroInfo, callback) {
        this.getAllHeroData((err, data) => {
            if (err) return callback(err)
            //将json中的字符串数组转成真正的数组
            let heroArr = JSON.parse(data);
            // 新数据的id就是总数据的长度+1
            heroInfo.id = +heroArr[heroArr.length - 1].id + 1;
            // 时间
            heroInfo.date = moment().format('YYYY-MM-DD HH:mm:ss')
            heroArr.push(heroInfo)
            // 读写进去
            fs.writeFile(path.join(__dirname, './hero.json'), JSON.stringify(heroArr), err => {
                if (err) return callback(false);
                callback(true);

            })
        })

    },
    //删除数据
    deleteHeroInfo(deleteId, callback) {
        this.getAllHeroData(function (err, data) {
            if (err) return callback(err)
            //将json中的字符串数组转成真正的数组
            let heroArr = JSON.parse(data)
            heroArr.some(function (item, index) {
                if (deleteId == item.id) {
                    heroArr.splice(index, 1)
                    return;
                }
            })
            // 读写进去
            fs.writeFile(path.join(__dirname, './hero.json'), JSON.stringify(heroArr), err => {
                if (err) return callback(false);
                callback(true);
            })
        })
    },

    // 编辑数据
    editHeroInfo(heroInfo,callback){
        // 先获取数据
        this.getAllHeroData(function (err, data) {
            if(err) return callback(false)
             //将json中的字符串数组转成真正的数组
             let heroArr = JSON.parse(data);
             //新数据的时间
             heroInfo.date = moment().format('YYYY-MM-DD HH:mm:ss')
             heroArr.some(function(item,index){
                 if(heroInfo.id == item.id){
                     heroArr.splice(index,1,heroInfo)
                 }
             })
             fs.writeFile(path.join(__dirname,'./hero.json'),JSON.stringify(heroArr),err=>{
                 if(err) return callback(false)
                 callback(true)
             })

        })
    }
}