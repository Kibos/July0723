var lookback = require('loopback');
var mongoose = require('mongoose');

module.exports = function(app,options){
	console.log('Start into db schema.....');
	var ds =app.datasources.Mongodb;

	mongoose.connect(ds.connector.settings.url,{server:{auto_reconnect:true}});

	mongoose.connection.on('connected',function(){
		console.log('Mongoose connection established');
	});

	mongoose.connection.on('error',function(err){
		console.log('Mongoose connection err:'+err);
	});

	mongoose.connection.on('disconnected',function(){
		console.log('Mongoose connection disconnected');
	});

   var product =require("./product")(app,app.models.product);
  // app.product=mongoose.model('product',product.schema);
}