const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  // Set up Chrome options (if needed)
  const options = new chrome.Options();
  options.addArguments('--headless'); // Run tests in headless mode (without a browser window)

  // Create a new WebDriver instance
  const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Perform your test actions here
    await driver.get('https://example.com');
    await driver.findElement(By.name('username')).sendKeys('myusername');
    await driver.findElement(By.name('password')).sendKeys('mypassword', Key.RETURN);

    // Wait for an element to be visible before proceeding
    await driver.wait(until.elementLocated(By.css('#welcome-message')), 5000);
    const welcomeMessage = await driver.findElement(By.css('#welcome-message')).getText();
    console.log('Welcome message:', welcomeMessage);
  } finally {
    // Clean up and quit the WebDriver
    await driver.quit();
  }
}

runTest();
