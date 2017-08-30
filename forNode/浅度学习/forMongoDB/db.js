var mongoose = require('mongoose');


var DB_URL = 'mongodb://localhost:27017/nodeDB'
mongoose.connect(DB_URL,{useMongoClient:true});

mongoose.connection.on('connected', function () {    
    console.log('连接成功 ' + DB_URL);  
});  



/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;