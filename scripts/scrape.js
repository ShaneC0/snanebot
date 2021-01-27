const puppeteer = require('puppeteer');
const spawn = require('child_process').spawn;

(async () => {
	const server = process.argv[2];
	const channel = process.argv[3];
	const email = "connors.shane@hotmail.com";
	const password = "g62bsdsc";
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({width: 800, height: 2000});
	await page.goto('https://discord.com/login');
	await page.type('input[name="email"]', email);
	await page.type('input[name="password"]', password);
	await page.click('[type="submit"]');
	await page.waitForSelector(`[aria-label*='${server}']`);
	await page.waitForTimeout(1000);
	await page.click(`[aria-label*='${server}']`);
	await page.waitForSelector(`[aria-label*='${channel}']`);
	await page.waitForTimeout(1000);
	await page.click(`[aria-label*='${channel}']`);
	await page.waitForTimeout(500);

	let messageHandles = await page.$$('[class*="markup"]');
	let currentCount = messageHandles.length;

	console.log('Waiting for messages');

	setInterval(async () => {
		messageHandles = await page.$$('[class*="markup"]');
		if(messageHandles.length > currentCount) {
			let text = await messageHandles[messageHandles.length - 2].evaluate(n => n.innerText);
			console.log('Sending Message');
			spawnMessageProcess(text, server, channel);
			currentCount = messageHandles.length
			console.log('Waiting for another message...');
		}
	}, 2000);
})();

function spawnMessageProcess(text, server, channel) {
	const process = spawn('node', ['./post.js', text, server, channel]);

	process.stdout.on('data', data => {
		console.log(`Message Process: ${data}`);
	});
}
