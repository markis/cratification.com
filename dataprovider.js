exports.DataProvider = function () {

    var cradle = require('cradle');


    // constructor
    var DataProvider = function(host, port) {
      this.connection= new (cradle.Connection)(host, port, {
        cache: true,
        raw: false
      });
      this.db = this.connection.database('cratification');
    };

    DataProvider.prototype.findById = function(id, callback) {
        this.db.get(id, function (err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    };

    //save
    DataProvider.prototype.save = function(animations, callback) {
        if (animations.length)
        {
            animations = { animations: animations};    
        }
        this.db.save(animations, callback);
    };

    return DataProvider;
} ();
