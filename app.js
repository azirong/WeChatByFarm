const Koa=require('koa');
const path=require('path')
const bodyParser = require('koa-bodyparser');
const ejs=require('ejs');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./config/default.js');
const router=require('koa-router')
const views = require('koa-views')
// const koaStatic = require('koa-static')
const staticCache = require('koa-static-cache')
const app = new Koa()

const express = require('express'), //express 框架
      wechat  = require('./wechat/wechat'), 
       config = require('./config');//引入配置文件
       
var appExp = express();//实例express框架

var wechatApp = new wechat(config); //实例wechat 模块

//用于处理所有进入 3000 端口 get 的连接请求
appExp.get('/',function(req,res){
    wechatApp.auth(req,res);
});

//用于处理所有进入 3000 端口 post 的连接请求
appExp.post('/',function(req,res){
    wechatApp.handleMsg(req,res);
});

//用于请求获取 access_token
appExp.get('/getAccessToken',function(req,res){
    wechatApp.getAccessToken().then(function(data){
        res.send(data);
    });    
});


//监听3000端口
appExp.listen(80);

console.log('listening 80')