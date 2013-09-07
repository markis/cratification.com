
var config = require('./lib/getConfig')
  , express = require('express')
  , assetManager = require('connect-assetmanager')
  , DataProvider = require('./dataprovider').DataProvider
  , ejs = require('ejs')
  
  
var app = module.exports = express.createServer(express.logger());

//var assetsMiddleware = assetManager(config.assets);

var dataprovider = new DataProvider(config.database.server, config.database.port);     

// Configuration
app.configure(function(){
    app.use(express.compress()); 
    app.use(express.bodyParser());
    app.use(express.cookieParser());
	//app.use(assetsMiddleware);
    
//    app.set('views', __dirname + '/views');
//    app.register('.html', ejs);
//    app.set('view engine', 'ejs');
//    
    app.use(express.methodOverride());
    app.use(express.favicon(__dirname + '/public/favicon.ico', {maxAge: 31557600000}));
    app.use(app.router);
    
    app.use(express.errorHandler());
    app.use(express.static(__dirname + '/public', { maxAge: 31557600000 }));
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/index.html');
});

app.get('/view/:id', function(req, res) {
    res.sendfile(__dirname + '/views/view.html');
});

app.post('/animation', function(req, res) {
    dataprovider.save(req.body, function (err, data) {
        if (err) {
            console.log(err);
            res.json({success:false});
        } else {
            res.json({success:true, id:data.id});
        }
    });
});

app.get('/animation/:id', function(req, res) {
    dataprovider.findById(req.params.id, function (err, data) {
        if (data && data.animations)
        {
            res.json(data.animations);
        }
        else
    	{
            console.log(err);
            res.statusCode = 404;
        	res.json([]);
    	}
    });
});


app.listen(config.port);
console.log("Express server listening");