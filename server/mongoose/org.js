var mongoose = require("mongoose");
var loopback= require('loopback');
var _=require('lodash');

var obj;

module.exports= org;
function org(app,model){
	if(!obj){
		initModel(app,model);
	}
	return obj;
}

function initModel(app,model){
	var schemaDefinition={
		name:{type:String},
		type:{type:String,required:true},
		address:{type:String},
		verifyied:{type:Boolean,default:false},
		users:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'user'},role:mongoose.Schema.Types.Mixed}]
	};
//}
	var schema = new mongoose.Schema(schemaDefinition,{collection:'org',timestamps:true});

	var orgObj =_.merge({},schemaDefinition,{});
	var apiObject='orgObj';

	var ds =app.datasources.transient;
	ds.define(apiObject,orgObj);

	obj = {
	schemaDefinition:schemaDefinition,
	schema:schema,
	apiObject:apiObject
	};


	//////////////////
	var org=model;

	//product.beforeRemote('getProducts',auth.tokenAccount);
	org.getOrgs=function(filter,cb){
		app.org.find(filter,function(err,instances){
			cb(err,instances);
		});

	};

	org.remoteMethod(
		'getOrgs',{
			accepts:[{arg:'filter',type:'object'}],
			returns:{arg:'org',type:['orgObj'],root:true},
			http:{path:'/',verb:'get'}
		}
	);

	org.createOrg=function(data,cb){
		(new app.org(data))
		.save(function(err,inst){
			if(err){ return cb(err);}
			cb(null,inst);
		});
	};

	org.remoteMethod(
		'createOrg',{
			accepts:[{arg:'data',type:'orgObj',http:{source:'body'}}],
			returns:{arg:'org',type:'orgObj',root:true},
			http:{path:'/',verb:'post'}
		}
	);

	org.getOrgById=function(id,cb){
		app.org.findOne({_id:id})
		.populate('users.id')
		.exec(function(err,inst){
			if(err){
				return cb(err);
			}
			cb(null,inst);
		});
	};

	org.remoteMethod(
		'getOrgById',{
			accepts:[{arg:'id',type:'any'}],
			returns:{arg:'org',type:'orgObj',root:true},
			http:{path:'/:id',verb:'get'}
		});

	}
