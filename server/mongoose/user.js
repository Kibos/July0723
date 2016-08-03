var mongoose = require("mongoose");
var loopback= require('loopback');
var _=require('lodash');

var obj;

module.exports= user;
function user(app,model){
	if(!obj){
		initModel(app,model);
	}
	return obj;
}

function initModel(app,model){
	var schemaDefinition={
		username:{type:String},
		email:{type:String,required:true}
	};
	
	var schema = new mongoose.Schema(schemaDefinition,{collection:'user'});
	
	obj = {
	schemaDefinition:schemaDefinition,
	schema:schema

	};

	
	
}