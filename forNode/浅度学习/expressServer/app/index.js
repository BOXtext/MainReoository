const express = require('express');
const utility = require('utility');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/mydb'

var operations = function (db, callback) {
	// 连接到表
	var collection = db.collection('testTable1');
// 	// 插入数据
// 	var data = [{"name": 'lianglang',"age":"2"},{"name":"lianglang2","age":"23"}];
// 	collection.insert(data, (err, result) => {
// 		if(err) {
// 			console.log("Error:" + err);
// 		}
// 		callback(result);
// 	})
// }

	// 查询数据
// 	var whereStr = {'name':'lianglang3'};
// 	collection.find(whereStr).toArray((err, res) => {
// 		if(err){
// 			console.log("Error:" + err);
// 			return;
// 		}
// 		console.log(res);
// 		callback(res)
// 	})
// }

		// 修改数据
// 		var whereStr = {'name':'lianglang'};
// 		var updateStr = {$set: {'name': 'lianglang3'}};
// 		collection.update(whereStr, updateStr, (err, res) => {
// 			if(err){
// 				console.log("Error:" + err);
// 				return;
// 			}
// 			callback(res)
// 		})
// }


// 	// 删除数据
// 	var whereStr = {'name':'lianglang3'};
// 	collection.remove(whereStr, (err, res) => {
// 		if(err) {
// 			console.log("Error:" + err);
// 			return;
// 		}
// 		callback(res)
// 	})
// }

MongoClient.connect(DB_CONN_STR, (err, db) => {
	console.log('连接成功');
	operations(db, (result) => {
		console.log(result);
		db.close()
	})
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("./public"));


// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
// app.use((req, res, next) => {
// 	console.log('Time:', Date.now());
// 	next()
// })

app.use('/testPost', ( req, res, next) => {
	// console.log(err);
	// res.status(500).send('500 Interval;')
	console.log("111" + req.body);
	next()
})
app.get('/testGet', (req, res) => {
	var cg = utility.md5(req.query.name)
	res.send(cg)
})

app.post('/testPost',(req, res) => {
	console.log(req.body);
	if(req.body.name && req.body.user){
		res.json({
			status:'0',
			data: {
				test1: '1323213',
				test2: 'dasdasdsa',
				test3: 'dasdasdasd'
			},
			msg: 'success'
		})
	} else {
		// res.send(req.body.name+"      "+req.body.user)
		res.json({
			status:'-1',
			data: null,
			msg: '请求参数有无'
		})
	}
})

app.listen(3000, ()=> {
	console.log("server 3000 start");
})
