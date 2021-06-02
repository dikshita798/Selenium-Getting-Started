const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Checkout Google.com', function () {
  let driver
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })
  it('Search on Google', async () => {
    await driver.get('https://google.com')
    await driver.findElement(By.name('q')).click()
    await driver.findElement(By.name('q')).sendKeys('dalenguyen', Key.RETURN)
    await driver.wait(until.elementLocated(By.id('rcnt')), 10000)
    await driver.findElement(By.name('q')).clear()

    let title = await driver.getTitle()
    assert.strictEqual(title, 'dalenguyen - Google Search')
  })
  //   after(async () => {
  //     return driver && (await driver.quit())
  //   })
})
