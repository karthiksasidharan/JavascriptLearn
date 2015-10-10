var fs = require('fs');
var path = require('path');
var ip = process.argv[2];
var extension  ="."+process.argv[3].toString();
fs.readdir(ip,function(err,list){
	var fileName;
	if(err){
		return;
	}
	for(i=0;i<list.length;i++){
		if(path.extname(list[i]).toString()===extension){
			console.log(list[i]);
		}
	}
});
