var mongoose = require("mongoose");
var loopback= require('loopback');
var _=require('lodash');

var obj;

module.exports= product;
function product(app,model){
	if(!obj){
		initModel(app,model);
	}
	return obj;
}

function initModel(app,model){
	var schemaDefinition={
		
		name:{type:String},
		price:{type:Number}

	
	};
	
	var schema = new mongoose.Schema(schemaDefinition,{collection:'product',timestamps:true});
	
	var productObj =_.merge({},schemaDefinition,{});
	var apiObject='productObj';
	
	var ds =app.datasources.transient;
	ds.define(apiObject,productObj);
	

	obj = {
	schemaDefinition:schemaDefinition,
	schema:schema,
	apiObject:apiObject
	};

	//////////////////
	var product=model;

	//product.beforeRemote('getProducts',auth.tokenAccount);
	product.getProducts=function(filter,cb){
		app.product.find(filter,function(err,instances){
			cb(err,instances);
		});

	};

	product.remoteMethod(
		'getProducts',{
			accepts:[{arg:'filter',type:'object'}],
			returns:{arg:'product',type:['productObj'],root:true},
			http:{path:'/',verb:'get'}
		}
	);
	
}