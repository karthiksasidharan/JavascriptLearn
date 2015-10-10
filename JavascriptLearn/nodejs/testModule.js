var fsModule = require('./filteredLSModule.js')
fsModule(process.argv[2],process.argv[3],function(err,data){
	if(err){
		console.log("Error");
		return;
	}
//	console.log("Function returned");
	data.forEach(function(data){
		console.log(data);
	});
});
