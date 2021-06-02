const { Builder, By } = require('selenium-webdriver')

describe('Checkout Formy', () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  it('Execute JavaScript', async () => {
    try {
      await driver.get('http://formy-project.herokuapp.com/modal')

      let modalButton = await driver.findElement(By.id('modal-button'))
      modalButton.click()
      await driver.sleep(5000)
      let closeButton = await driver.findElement(By.id('close-button'))
      await driver.executeScript('arguments[0].click()', closeButton)
      await driver.sleep(5000)
    } catch (error) {
      console.log(error)
    }
  })

  after(() => driver.quit())
})
