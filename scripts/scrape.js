const puppeteer = require('puppeteer');
const sendMessage = require('./post.js');

//Scraper

(async ()  => {
	const scrapingServer = process.argv[2];
	const scrapingChannel = process.argv[3];
	const sendingServer = process.argv[4];
	const sendingChannel = process.argv[5];
	const email = "augustgudaitis@gmail.com";
	const password = "Brownie123!";

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({width: 800, height: 5000});
	await page.goto('https://discord.com/login');

	console.log('https://discord.com/login loaded, awaiting login');

	await page.type('input[name="email"]', email);
	await page.type('input[name="password"]', password);
	await page.click('[type="submit"]');
	await page.waitForSelector(`[aria-label*='${scrapingServer}']`);
	await page.waitForTimeout(1000);

	console.log(`Logged in as ${email}, selecting server ${scrapingServer}`);

	await page.click(`[aria-label*='${scrapingServer}']`);
	await page.waitForSelector(`[aria-label*='${scrapingChannel}']`);
	await page.waitForTimeout(1000);

	console.log(`Selected server ${scrapingServer}, selecting channel ${scrapingChannel}`);

	await page.click(`[aria-label*='${scrapingChannel}']`);
	await page.waitForTimeout(500);

	console.log(`Selected channel ${scrapingChannel}, initializing...`);

	let messageHandles = await page.$$('[class*="markup"]');
	let currentCount = messageHandles.length;

	console.log(`Scraping ${scrapingChannel} in ${scrapingServer}.`);

	setInterval(async () => {
		messageHandles = await page.$$('[class*="markup"]');
		if(messageHandles.length > currentCount) {
			let text = await messageHandles[messageHandles.length - 2].evaluate(n => n.innerText);
			console.log(`Sending message ${text} to ${sendingChannel} in ${sendingServer}`);
			currentCount = messageHandles.length;
			await sendMessage(text, sendingServer, sendingChannel);
			console.log(`Scraping ${scrapingChannel} in ${scrapingServer}.`);
		}
	}, 2000);
})();
