var express = require('express');
var router = express.Router();
const userModel = require('../dao/mysql.js');
const md5 = require('md5')
// const checkNotLogin = require('../middlewares/check.js').checkNotLogin
// const checkLogin = require('../middlewares/check.js').checkLogin
const moment = require('moment');
const fs = require('fs')

// 注册
router.get('/signup', function (req, res) {
    res.render('index', {title: 'hello'})
})


// 登录
router.get('/login', function (req, res) {
    res.render('login', {title: 'hello'})

})

// 个人中心
router.get('/personal', function (req, res) {
    res.render('personal', {})

})

// 实时数据查询页面
router.get('/realTime', function (req, res) {
    res.render('realTime', {})

})

// 历史数据查询页面
router.get('/historyData', function (req, res) {
    res.render('historyData', {})

})

// 控制设备页面
router.get('/controller', function (req, res) {
    res.render('controller', {})

})

// post 注册
router.post('/signup', function(req, res, next) {
    let user = [
        req.body.name,
        req.body.tele,
        req.body.pass,
        req.body.city
    ];

    var sql = "select * from users where name='" + req.body.name + "';";
    userModel.query(sql, [], function (err, rows) {
        if (err) {
            res.send("修改失败 " + err);
        } else if (rows.length) {
            res.data = 1;
            res.send("success");
        } else {
            // var sql = "insert into users (name,tele,pass,city) values('"+req.body.name+"','"+req.body.tele+"','"+req.body.pass+"', '"+req.body.city+"')";
            var sql = "insert into users (name,tele,pass,city) values(?,?,?,?)";
            userModel.query(sql,user,function(err,rows){
                if(err){
                    res.send("修改失败 " + err);
                }else {
                    res.data = 3;
                    res.send("success");
                }
            });
        }
    })

})

// post 注册
router.post('/addFarmData', function(req, res, next) {
    let farmData = [
        req.body.temperature,
        req.body.humidity,
        req.body.light,
        req.body.carbon
    ];

    console.log(req.body)
    console.log("is testing user data")

    var sql = "insert into farmdata (temperature,humidity,light,carbon) values(?,?,?,?)";
    userModel.query(sql,farmData,function(err,rows){
        if(err){
            console.log(err);
            res.send("修改失败 " + err);
        }else {
            res.data = 3;
            res.send("success");
        }
    });

})

// 获取实时数据
router.post('/getRealTime', function(req, res, next) {
    let realTime = req.body.realTime;

    var sql = "select * from farmdata where time='" + realTime + "';";
    userModel.query(sql,[],function(err,rows){
        if (err) {
            res.send("修改失败 " + err);
        } else if (rows.length) {
            res.data = 1;
            res.send(rows);
        } else {
            res.data = 0;
            res.send("fail");
        }
    });

})

module.exports = router;