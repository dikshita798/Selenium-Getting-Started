const { By, until } = require('selenium-webdriver')

class ConfirmationPage {
  constructor(driver) {
    this.driver = driver
  }

  async waitForAlertBanner() {
    await this.driver.wait(until.elementsLocated(By.className('alert')), 10000)
  }
  async getAlertBannerText() {
    return await this.driver.findElement(By.className('alert')).getText()
  }
}
module.exports = ConfirmationPage
