var fs        = require('fs');
/**
 * define
 */
var express   = require('express');
var webdriver = require('selenium-webdriver');
var router    = express.Router();

var until = webdriver.until;
var By = webdriver.By;

try {
	var driver = new webdriver.Builder()
			.forBrowser('chrome')//'phantomjs' 
			.build();
	// var sizeWidth = 1400;
	// var sizeHeight = 480;
	// resize window
	// driver.manage().window().setSize(sizeWidth, sizeHeight);
} catch (e) {
	console.log("lỗi selenium" + e);
	driver = false
}


router.get("/run", async function (req, res) {

	if( !driver ){
		return driver
	}
	try {
		await driver.get('https://www.click49.net/forum/'); // http://land.vn
		
		var btnLogin = await driver.findElement(By.xpath("//*[contains(@class, 'p-navgroup-link--logIn')]"));
		await btnLogin.click(); ///sendKeys("hùng đẹp trai" );

		let closeButton1 = await driver.wait(until.elementLocated(By.xpath("//*[contains(@class, 'js-overlayClose')]")))
        closeButton1 = await driver.wait(until.elementIsVisible(closeButton1))
        // await closeButton1.click()
		
		var inputUser = await driver.findElement(By.xpath("//*[@name='login']"));
		await inputUser.sendKeys("thuhuong121294@gmail.com");

		var inputPassword = await driver.findElement(By.xpath("//*[@name='password']"));
		await inputPassword.sendKeys("phamdohuy150899");

		var btnSubmitLogin = await driver.findElement(By.xpath("//*[contains(@class, 'button--icon--login')]"));
		await btnSubmitLogin.click();


		let linkAvatar = await driver.wait(until.elementLocated(By.xpath("//a[contains(@class, 'p-navgroup-link--user')]")))
        linkAvatar = await driver.wait(until.elementIsVisible(linkAvatar))
		

		var testFolder = './1.png';
		res.writeHead(200,{'Content-Type': "application/json; charset=utf-8"});
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
		
		res.writeHead(200,{'Content-Type': "application/json; charset=utf-8"});
		res.write("lỗi selenium ngoài cùng!" + e.message);
		res.end();
		return false;
	}
});

module.exports = router;