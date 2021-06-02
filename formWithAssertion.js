const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
const AssertionError = require('assert').AssertionError
var capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: [
      '--disable-plugin',
      //, '--headless'
    ],
  },
}

describe('Checkout Formy', () => {
  let driver
  before(async () => {
    driver = await new Builder().withCapabilities(capabilities).build()
  })

  it('form', async () => {
    try {
      await driver.get('http://formy-project.herokuapp.com/form')
      await driver.findElement(By.id('first-name')).sendKeys('Dale')
      await driver.findElement(By.id('last-name')).sendKeys('Nguyen')
      await driver
        .findElement(By.id('job-title'))
        .sendKeys('Application Developer')
      await driver.findElement(By.id('radio-button-1')).click()
      await driver.findElement(By.id('checkbox-1')).click()
      await driver.findElement(By.css('option[value="1"]')).click()
      await driver.findElement(By.id('datepicker')).click()
      await driver.wait(
        until.elementsLocated(By.className('datepicker-days')),
        10000
      )
      await driver
        // .findElement(
        //   By.css(
        //     'div.datepicker-days table.table-condensed tbody tr:nth-child(2)' // td:nth-child(2)'
        //   )
        // )
        //.findElement(By.css('td[date-date="1623024000000"]')) //data-date="1623024000000" is not working
        .findElement(By.css('td[class="today day"]'))
        .click()

      await driver.findElement(By.css('.btn.btn-lg.btn-primary')).click()

      await driver.wait(until.elementsLocated(By.className('alert')), 10000)
      const alert = await driver.findElement(By.className('alert'))
      assert.strictEqual(
        'The form was successfully submitted!!!',
        await alert.getText()
      )
    } catch (error) {
      if (error instanceof AssertionError) {
        console.log('Assertion Error : ', error.message)
      } else {
        console.log('Error : ', error.message)
      }
      throw new Error(error)
    }
  })

  after(async () => await driver.quit())
})
