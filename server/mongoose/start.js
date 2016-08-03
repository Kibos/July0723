var lookback = require('loopback');
var mongoose = require('mongoose');

module.exports = function(app,options){
	console.log('Start into db schema.....');
	var ds =app.datasources.Mongodb;

	mongoose.connect(ds.connector.settings.url,{server:{auto_reconnect:true}});

	mongoose.connection.on('connected',function(){
		console.log('Mongoose connection ok');
	});

	mongoose.connection.on('error',function(err){
		console.log('Mongoose connection err:'+err);
	});

	mongoose.connection.on('disconnected',function(){
		console.log('Mongoose connection disconnected');
	});

  //  var product =require("./product")(app,app.models.product);
  //  app.product=mongoose.model('product',product.schema);

	    var org =require("./org")(app,app.models.org);
	    app.org=mongoose.model('org',org.schema);

  var user =require("./user")(app,app.models.user);
   app.user=mongoose.model('user',user.schema);

}
