var assetHandler = require('connect-assetmanager-handlers')

var settings = {
    'port': 8082
	, 'uri': 'http://localhost:8080' // Without trailing /
	, 'assets' : {
		'js': {
			'route': /\/static\/js\/[a-z0-9]+\/.*\.js/
			, 'path': __dirname+'/public/js/'
			, 'dataType': 'javascript'
			, 'files': [
				'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
                'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js',
				'cratify.js'
			]
			, 'debug': true
			, 'postManipulate': {
				'^': [
					assetHandler.uglifyJsOptimize
				]
			}
		}, 
		'css': {
			'route': /\/static\/css\/[a-z0-9]+\/.*\.css/
			, 'path': __dirname+'/public/css/'
			, 'dataType': 'css'
			, 'files': [
				'styles.css'
			]
			, 'debug': true
			, 'postManipulate': {
				'^': [
					assetHandler.fixVendorPrefixes
					, assetHandler.fixGradients
					, assetHandler.replaceImageRefToBase64(__dirname+'/public')
					, assetHandler.yuiCssOptimize
				]
			}
		}
	}
	// You can add multiple recipiants for notifo notifications
	, 'notifoAuth': null /*[
		{
			'username': ''
			, 'secret': ''
		}
	]*/

	/*
	// Enter API keys to enable auth services, remove entire object if they aren't used.
	, 'external': {
		'facebook': {
			appId: '123983866527489',
			appSecret: '6edf1327ege27bbba2e239f73cd866c4'
		}
		, 'twitter': {
			consumerKey: 'eA54JQ6rtdZE7nqaRa6Oa',
			consumerSecret: '6u2makgFdf4F6EauP7osa54L34SouU6eLgaadTD435Rw'
		}
		, 'github': {
			appId: '1444g6a7d26a3f716b47',
			appSecret: 'e84f13367f328da4b8c96a4f74gfe7e421b6a206'
		}
	}
	*/
	, 'debug': (process.env.NODE_ENV !== 'production')
    , 'database' : {
        'server' : 'http://markist.iriscouch.com/'
        , 'port' : 80
    }
};


settings.port = process.env.PORT || settings.port;
settings.database.server = process.env.DATABASE_SERVER || settings.database.server;            
settings.database.port = process.env.DATABASE_PORT || settings.database.port;   

if (process.env.NODE_ENV == 'production') {
	settings.uri = 'http://yourname.no.de';

	//settings.airbrakeApiKey = '0190e64f92da110c69673b244c862709'; // Error logging, Get free API key from https://airbrakeapp.com/account/new/Free
}
module.exports = settings;