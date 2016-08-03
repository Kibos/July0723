var admin ={ username:'Admin',email:'admin@qq.com',password:'111'};

var app = require('../server/server');

app.models.user.create(admin,function(err,u){
  if(err){
    return console.log(err);
  }
  console.log(u);
});
