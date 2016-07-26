module.exports = function(Coffeeshop11) {

   Coffeeshop11.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }
     
    Coffeeshop11.remoteMethod(
        'greet', 
        {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
        }
    );
};
