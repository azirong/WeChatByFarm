var express = require('express');
var router = express.Router();
const userModel = require('../dao/mysql.js');
const md5 = require('md5')
// const checkNotLogin = require('../middlewares/check.js').checkNotLogin
// const checkLogin = require('../middlewares/check.js').checkLogin
const moment = require('moment');
const fs = require('fs')

router.get('/', function (req, res) {
    res.render('index', {title: 'hello'})
})

router.get('/signup', function (req, res) {
    console.log(req.body + "req.body")

})

// post 注册
router.post('/signup', function(req, res) {
    let user = [
        req.body.name,
        req.body.tele,
        req.body.pass,
        req.body.city
    ];
    var sql = "insert into users (name,tele,pass,city) values('"+req.body.name+"','"+req.body.tele+"','"+req.body.pass+"', '"+req.body.city+"')";
    userModel.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.data = 3;
            res.send("success");
        }
    });
})

module.exports = router;