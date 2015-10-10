var fs = require('fs');
var path = require('path');



module.exports = function (inputpath,extension,callback){


//	console.log(inputpath+":"+extension);
	var ext="."+extension;
	var filteredNames = new Array();
	fs.readdir(inputpath,function(err,list){
		if(err)
			return	callback(err);
		
//		console.log("Read file in module");
		
		for(i=0;i<list.length;i++){
			if(path.extname(list[i]).toString()===ext){
//			console.log(list[i]);	
			filteredNames.push(list[i]);
			}
		}
		callback(null,filteredNames);
	});
}

