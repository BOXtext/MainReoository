var mg = require('mongodb').MongoClient;
var connect_STR = 'mongodb://localhost:27017/mydb';

var invokeProcData = (db, callback) => {
	//储存过程调用
	db.eval('get_testTable1_count()', (err, res) => {
		if(err) {
			console.log('');
			return;
		}
		callback(res)
	});
}

mg.connect(connect_STR, (err, db) => {
	console.log('连接成功');
	invokeProcData(db, (res) => {
		console.log(res);
		db.close()
	})
})
