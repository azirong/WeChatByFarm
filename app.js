const express = require('express'), //express 框架
      path = require('path'),
      wechat  = require('./wechat/wechat'),
       cookieParser = require('cookie-parser'),
       bodyParser = require('body-parser'),
       config = require('./config');//引入配置文件
const cookieSession = require('cookie-session');

var users = require('./routes/users');
       
var app = express();//实例express框架

var wechatApp = new wechat(config); //实例wechat 模块

//用于处理所有进入 3000 端口 get 的连接请求
app.get('/',function(req,res){
    wechatApp.auth(req,res);
});

//用于处理所有进入 3000 端口 post 的连接请求
app.post('/',function(req,res){
    wechatApp.handleMsg(req,res);
});

//用于请求获取 access_token
app.get('/getAccessToken',function(req,res){
    wechatApp.getAccessToken().then(function(data){
        res.send(data);
    });    
});

//设置cookie，session
app.use(cookieParser('Neal_signed'));
(function () {
    var arr = [];
    for(var i = 0;i<10000;i++){
        arr.push('keys_'+Math.random());
    }
    app.use(cookieSession({
        name:'session_id',
        keys:arr,
        maxAge:20*60*1000//一般我会设置20分钟，这里是为了感受session过期~~带来的快感~?(●´∀｀●)ﾉ
    }))
})();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));    // 加载前端资源css、js、picture


app.use('/', users);

//监听3000端口
app.listen(80);

console.log('listening 80')