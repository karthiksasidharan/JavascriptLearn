var fs = require('fs');
var buf = fs.readFile(process.argv[2],function(err,data){
	if(err){
		return;
	}
	var arr = data.toString().split('\n');
	console.log(arr.length-1);
});

