const puppeteer = require('puppeteer');
const spawn = require('child_process').spawn;

//Scraper

(async () => {
	const server = process.argv[2];
	const channel = process.argv[3];
	const email = "augustgudaitis@gmail.com";
	const password = "Brownie123!";

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({width: 800, height: 1000});
	await page.goto('https://discord.com/login');

	console.log('Page Loaded...');

	await page.type('input[name="email"]', email);
	await page.type('input[name="password"]', password);
	await page.click('[type="submit"]');
	await page.waitForSelector(`[aria-label*='${server}']`);
	await page.waitForTimeout(1000);

	console.log(`Logged in as ${email}`);

	await page.click(`[aria-label*='${server}']`);
	await page.waitForSelector(`[aria-label*='${channel}']`);
	await page.waitForTimeout(1000);

	console.log(`Selected server ${server}`);

	await page.click(`[aria-label*='${channel}']`);
	await page.waitForTimeout(500);

	console.log(`Selected channel ${channel}`);

	let messageHandles = await page.$$('[class*="markup"]');
	let currentCount = messageHandles.length;

	console.log('Waiting for messages...');

	setInterval(async () => {
		messageHandles = await page.$$('[class*="markup"]');
		if(messageHandles.length > currentCount) {
			let text = await messageHandles[messageHandles.length - 2].evaluate(n => n.innerText);
			console.log(`Sending ${text} to ${server}/${channel}`);
			spawnMessageProcess(text);
			currentCount = messageHandles.length
		}
	}, 2000);
})();

function spawnMessageProcess(text) {
	const process = spawn('node', ['./post.js', text]);

	process.stdout.on('data', data => {
		console.log(`Message Process: ${data}`);
	});
}
