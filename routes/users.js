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
            console.log(err);
            res.send("修改失败 " + err);
        } else if (rows.length) {
            console.log("该用户已存在");
            // res.json({ user: 'tobi' });
            // res.send("fail");
            res.data = 1;
            res.send("success");
        } else {
            // var sql = "insert into users (name,tele,pass,city) values('"+req.body.name+"','"+req.body.tele+"','"+req.body.pass+"', '"+req.body.city+"')";
            var sql = "insert into users (name,tele,pass,city) values(?,?,?,?)";
            userModel.query(sql,user,function(err,rows){
                if(err){
                    console.log(err);
                    res.send("修改失败 " + err);
                }else {
                    res.data = 3;
                    res.send("success");
                }
            });
        }
    })

})

module.exports = router;