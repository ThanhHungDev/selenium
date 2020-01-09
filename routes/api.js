var fs        = require('fs');
/**
 * define
 */
var express   = require('express');
var webdriver = require('selenium-webdriver');
var router    = express.Router();


router.get("/run", async function (req, res) {
	try {
		var driver = new webdriver.Builder()
				.forBrowser('phantomjs')
				.build();
		var sizeWidth = 1400;
    	var sizeHeight = 480;
		// resize window
		driver.manage().window().setSize(sizeWidth, sizeHeight);
	} catch (e) {
		console.log("lỗi selenium" + e);
		return false;
	}
	try {
		await driver.get('http://149.28.31.139/');
		var titleF = await driver.getTitle();
		console.log(titleF);
		const testFolder = './'+titleF+'.png';
		res.writeHead(200,{'Content-Type': 'text/plain'});
		res.write(testFolder);
		res.end();
		driver.takeScreenshot().then(
			function(image, err) {
				fs.writeFile(testFolder, image ,  'base64' , function(err) {
					if(err) {
						return console.log(err);
					}
					console.log("The file was saved!");
					return;
				}); 
			}
		);
		///////////////////////////////////////////////
	} catch (e) {
		console.log("lỗi selenium ngoài cùng!" + e);
		return false;
	}
});

module.exports = router;