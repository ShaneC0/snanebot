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
	await page.waitForSelector(`[aria-label*="${scrapingServer}"]`);
	await page.waitForTimeout(1000);

	console.log(`Logged in as ${email}, selecting server ${scrapingServer}`);

	await page.click(`[aria-label*="${scrapingServer}"]`);
	await page.waitForSelector(`[aria-label*="${scrapingChannel}"]`);
	await page.waitForTimeout(1000);

	console.log(`Selected server ${scrapingServer}, selecting channel ${scrapingChannel}`);

	await page.click(`[aria-label*="${scrapingChannel}"]`);
	await page.waitForTimeout(1000);

	console.log(`Selected channel ${scrapingChannel}, initializing...`);

	let messageHandles = await page.$$('[class*="markup"]');
	let currentCount = messageHandles.length;

	console.log(`Waiting for messages...`);

	let paused = false;

	setInterval(async () => {
		if(!paused){
			messageHandles = await page.$$('[class*="markup"]');
			paused = true;
			for(let i = currentCount; i < messageHandles.length; i++) {
				let text = await messageHandles[i - 1].evaluate(n => n.innerText);
				text = text.replace(/[@](.*?(\s|$))/gm, '');
				console.log(`Sending: ${text}`);
				await sendMessage(text, sendingServer, sendingChannel);
			}
			currentCount = messageHandles.length;
			paused = false;
		}
	}, 5000);
})();
