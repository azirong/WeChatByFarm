'use strict'

var mysql = require('mysql')
var config = require('../config/default.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
})

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

// let query = function( sql, values ) {
//
//     return new Promise(( resolve, reject ) => {
//         pool.getConnection(function(err, connection) {
//             if (err) {
//                 reject( err )
//             } else {
//                 connection.query(sql, values, ( err, rows) => {
//
//                     if ( err ) {
//                         reject( err )
//                     } else {
//                         resolve( rows )
//                     }
//                     connection.release()
//                 })
//             }
//         })
//     })
//
// }

let createTable = function( sql ) {
    return query( sql, [] )
}



let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     tele VARCHAR(100) NOT NULL,
     pass VARCHAR(100) NOT NULL,
     city VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`

// 建表
// createTable(users)

// 注册用户
let insertData = function( value ) {
    let _sql = "insert into users set name=?,tele=?,pass=?,city=?,moment=?;"
    query2()
}

module.exports = {
    query,
    createTable,
    insertData
};