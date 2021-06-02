const { Builder, By } = require('selenium-webdriver')

var capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--disable-plugins', '--headless'],
  },
}

describe('Checkout Formy', () => {
  let driver

  before(async () => {
    driver = await new Builder().withCapabilities(capabilities).build()
  })

  it('Switch to Alert', async () => {
    try {
      await driver.get('http://formy-project.herokuapp.com/switch-window')

      let alertButton = await driver.findElement(By.id('alert-button'))
      alertButton.click()

      // Wait for the alert to appear
      await driver.sleep(5000)

      // Close alert window
      let alert = await driver.switchTo().alert()
      await driver.sleep(5000)
      alert.accept()
      await driver.sleep(5000)
    } catch (error) {
      console.log(error)
    }
  })

  after(() => driver.quit())
})
