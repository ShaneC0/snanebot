const puppeteer = require('puppeteer');

//MESSAGE SENDER

async function sendMessage (message, sendingServer, sendingChannel){

	const email = "connors.shane@hotmail.com";
	const password = "g62bsdsc";

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({width: 800, height: 2000});
	await page.goto('https://discord.com/login');

	await page.type('input[name="email"]', email);
	await page.type('input[name="password"]', password);
	await page.click('[type="submit"]');
	await page.waitForSelector(`[aria-label*='${sendingServer}']`);
	await page.waitForTimeout(1000);

	await page.click(`[aria-label*='${sendingServer}']`);
	await page.waitForSelector(`[aria-label*='${sendingChannel}']`);
	await page.waitForTimeout(1000);

	await page.click(`[aria-label*='${sendingChannel}']`);

	await page.type('[class*="textArea"]', message);
	await page.keyboard.press('Enter');

	await browser.close();
}

module.exports = sendMessage
