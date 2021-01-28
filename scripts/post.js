const puppeteer = require('puppeteer');

//MESSAGE SENDER

async function sendMessage (message){

	const server = "Good Looks Cooks";
	const channel = "_snanebot";
	const email = "connors.shane@hotmail.com";
	const password = "g62bsdsc";

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({width: 800, height: 2000});
	await page.goto('https://discord.com/login');

	console.log('Page Loaded...');

	await page.type('input[name="email"]', email);
	await page.type('input[name="password"]', password);
	await page.click('[type="submit"]');
	await page.waitForSelector(`[aria-label*='${server}']`);
	await page.waitForTimeout(1000);

	console.log('Logged In...');

	await page.click(`[aria-label*='${server}']`);
	await page.waitForSelector(`[aria-label*='${channel}']`);
	await page.waitForTimeout(1000);

	console.log('Server Selected...');

	await page.click(`[aria-label*='${channel}']`);

	console.log('Channel Selected...');

	await page.type('[class*="textArea"]', message);
	await page.keyboard.press('Enter');

	console.log('Message Sent...');
	console.log('Exiting...');

	await browser.close();
}

module.exports = sendMessage
