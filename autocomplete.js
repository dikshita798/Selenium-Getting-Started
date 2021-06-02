const { Builder, By, Key, until } = require('selenium-webdriver')

describe('Checkout Formy', async () => {
  let driver

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  it('Autocomplete', async () => {
    await driver.get('http://formy-project.herokuapp.com/autocomplete')
    const autocomplete = await driver.findElement(By.id('autocomplete'))
    autocomplete.sendKeys('51 Bathurst Street, Toronto, ON, Canada')

    await driver.wait(until.elementsLocated(By.className('pac-item')), 10000)

    const autocompleteResult = await driver.findElement(
      By.className('pac-item')
    )
    autocompleteResult.click()

    const streetNumber = await driver
      .findElement(By.id('street_number'))
      .getAttribute('value')
    console.log(streetNumber)
  })

  //   after(async () => {
  //     return driver && (await driver.quit())
  //   })
})
