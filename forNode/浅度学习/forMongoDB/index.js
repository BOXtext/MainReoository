const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
// 连接

// var forms = new Schema({
// 	date1: {type: Date},
// 	date2: {type: Date},
// 	delivery: {type: Boolean},
// 	desc: {type: String},
// 	name: {type: String},
// 	region: {type: String},
// 	resource: {type: String},
// 	type: {type: Array}
// })
// var formsTest = mongoose.model('Forms', forms);

var echartForm = new Schema({
	name: {type: String},
	type: {type: String},
	data: {type: Array},
	smooth: {type: Boolean}
})
var echartFormData = mongoose.model('echartForm',echartForm);

// 早Echarts的数据类
class mkData {
	constructor() {

	}
	selectData() {
		return new Promise(function(resolve, reject) {
			var wherestr = {}
			echartFormData.find(wherestr, (err, res) => {
				if (err) {
		      console.log("Error:" + err);
		    } else {
	        resolve(res)
		    }
			})
		})
	}
	insertData() {
		var data =  []
		for(var i=0; i<10; i++) {
			data.push(new echartFormData({
			  name: Math.floor(Math.random()*1000000).toString(16),
			  type: 'line',
			  data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
				smooth: true
			}))
		}
		data.forEach((item, index) => {
			item.save((err, res) => {
				if(err){
					console.log("Error:" + err);
				} else {
					console.log("res:      " + res);
				}
			})
		})
	}
}
app.get('/selectEchart', (req, res) => {
	if(req) {
		var tmp = new mkData();
		tmp.selectData().then(data => {
			res.json({
				msg:'666',
				data: data
			})
		})
	}
})
app.post('/insertEchart', (req, res) => {
	if(req) {
		var inser = new mkData()
		inser.insertData();
		res.send('666')
	}
})

function insert(delivery, desc, name, region, resource, type, date1, date2) {
	var form1 = new formsTest({
		delivery : delivery,                 //用户账号
		desc: desc,                            //密码
		name: name,
		region: region,
		resource: resource,
		type:type,                         //年龄
		date1 : date1,
		date2 : date2
	});

	form1.save((err, res) => {
		if(err){
			console.log("Error:" + err);
		} else {
			console.log("res:      " + res);
		}
	})
}

function update() {
	var whereStr = {'username': 'dhsad'};
	var updateStr = {'userpwd': 'zzzz'}
	User.update(whereStr, updateStr, (err, res) => {
		if(err) {
			console.log("Error:" + err);
		}else {
			console.log("res:" + res);
		}
	})

}

function find() {
	return new Promise(function(resolve, reject) {
		var wherestr = {}
		User.find(wherestr, (err, res) => {
			if (err) {
	      console.log("Error:" + err);
	    } else {
        resolve(res)
	    }
		})
	})
}
app.get('/', (req, res)=> {
	res.send('hello')
})

app.post('/insert', (req, res)=> {
	if(req) {
		insert(req.body.delivery, req.body.desc, req.body.name, req.body.region, req.body.resource, req.body.type, req.body.date1, req.body.date2);
		res.json({
			msg:"插入成功"
		})
	}else {
		res.json({
			status: '-1',
			msg: '插入失败'
		})
	}
})

app.post('/find', (req, res)=> {
	var a = {};
	find().then((r) => {
		a = r;
		res.json({
		 status:'0',
		 data: a,
		 msg: 'success'
		})
	})
})

app.listen(3000,()=>{
	console.log('服务器启动');
})
