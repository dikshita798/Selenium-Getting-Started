const assert = require('assert')
const AssertionError = require('assert').AssertionError
const { Builder } = require('selenium-webdriver')
const FormPage = require('./pages/formPage')
const ConfirmationPage = require('./pages/confirmationPage')

describe('Checkout Formy', () => {
  let driver
  let formPage
  let confirmationPage

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  it('Form', async () => {
    try {
      await driver.get('http://formy-project.herokuapp.com/form')

      formPage = new FormPage(driver)
      await formPage.submitForm(driver)

      confirmationPage = new ConfirmationPage(driver)
      await confirmationPage.waitForAlertBanner()
      assert.strictEqual(
        'The form was successfully submitted!',
        await confirmationPage.getAlertBannerText()
      )
    } catch (error) {
      if (error instanceof AssertionError) {
        console.log('Assertion Error : ', error.message)
        throw new Error(error)
      } else {
        console.log('Error : ', error)
      }
    }
  })

  after(async () => driver.quit())
})
