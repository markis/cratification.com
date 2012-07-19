var siteConfig;
try {
    // Usually we check for siteConfig.js in project root.
	siteConfig = require('../config.js');
} catch(e) {
	try {
		// Looks for siteConfig in home dir, used for no.de
		siteConfig = require(__dirname+'/config.js');
	} catch(e) {
        console.log(e);
		throw new Error('Could not load site config.')
	}
}

module.exports = siteConfig;