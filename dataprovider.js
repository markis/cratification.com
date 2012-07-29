exports.DataProvider = function () {

    var cradle = require('cradle');

    // Class level variables;
    var db;

    // constructor
    var DataProvider = function(host, port) {
        var connection= new (cradle.Connection)(host, port, {
            cache: true,
            raw: false
        });
        db = connection.database('cratification');
    };

    DataProvider.prototype = {
        findById : function(id, callback) {
            db.get(id, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            });
        },

    //save
        save : function(animations, callback) {
            if (animations.length)
            {
                animations = { animations: animations};    
            }
            db.save(animations, callback);
        }
    };

    return DataProvider;
} ();
