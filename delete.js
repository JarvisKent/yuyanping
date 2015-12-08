var fs = require('fs');
var dir = './source/_posts/pat/';
fs.readdir(dir,function(err,files){
	var i,file;
	for (i = 0; file = files[i]; i++) {
		fs.rename(dir+file,dir+file.substring(file.indexOf('-')+1));		
	}
})