module.exports = function(Goods) {

	  Goods.goodsList = function(id, cb) {
      var goodsModel = app.models.goods;
      
      Goods.getAccounts(id, function(err, accounts){
        async.map(accounts, function(acct, resolve) {
          if (acct.ownership === 'member'){
            return resolve(null, []);
          }
          projectModel.find({where:{ownerId: acct.id}}, function(err, items){
            for(var i=0; i<items.length; i++){
              items[i].accountName = acct.name;
            }
            resolve(null, items);
          });
        }, function(err, results){
          var list = [];
          results.forEach(function(p){
            list = list.concat(p);
          });
          cb(err, list);
        });
      });
    };

    Goods.remoteMethod(
      'projectList', {
        accepts: [{arg: 'id',type: 'string',required: true}],
        returns: {arg: 'projects',type: ['project'],root: true},
        http: {
          path: '/:id/projectList',
          verb: 'get'
        },
        accessType: 'READ',
        description: 'Fetches projects user owned'
      }
    );

};
