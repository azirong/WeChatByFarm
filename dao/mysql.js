'use strict'

var mysql = require('mysql')
var config = require('../config/default.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
})

function query(sql,values,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, values, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

let query2 = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })

}

let createTable = function( sql ) {
    return query2( sql, [] )
}


//用户information表
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     tele VARCHAR(100) NOT NULL,
     pass VARCHAR(100) NOT NULL,
     city VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`

// farmData环境因子数据表
let farmData =
    `create table if not exists farmdata(
     id INT NOT NULL AUTO_INCREMENT,
     temperature VARCHAR(100) NOT NULL,
     humidity VARCHAR(100) NOT NULL,
     light VARCHAR(100) NOT NULL,
     carbon VARCHAR(100) NOT NULL,
     electricity VARCHAR(100) NOT NULL,
     time datetime DEFAULT  NULL,
     PRIMARY KEY ( id )
    );`

//建表
createTable(users);
createTable(farmData);


// 注册用户
let insertData = function( value ) {
    let _sql = "insert into users set name=?,tele=?,pass=?,city=?,moment=?;"
    query2()
}

// 通过名字查找用户
let findDataByName = function ( name, data ) {
    let _sql = `select * from users where name="${name}";`
    return query( _sql, [], function (err, rows) {
        if (err) {
            data["data"] = err;
        } else if (rows.length) {
            data["data"] = 1;

        } else {
            data["data"] = 3;
        }
    })
}

module.exports = {
    query,
    createTable,
    insertData,
};