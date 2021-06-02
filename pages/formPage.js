const { By, Key } = require('selenium-webdriver')

class FormPage {
  constructor(driver) {
    this.driver = driver
  }
  async submitForm() {
    await this.driver.findElement(By.id('first-name')).sendKeys('Dale')
    await this.driver.findElement(By.id('last-name')).sendKeys('Nguyen')
    await this.driver
      .findElement(By.id('job-title'))
      .sendKeys('Application Developer')
    await this.driver.findElement(By.id('radio-button-1')).click()
    await this.driver.findElement(By.id('checkbox-1')).click()
    await this.driver.findElement(By.css('option[value="1"]')).click()
    await this.driver
      .findElement(By.id('datepicker'))
      .sendKeys('11/13/2018', Key.RETURN)

    await this.driver.findElement(By.css('.btn.btn-lg.btn-primary')).click()
  }
}
module.exports = FormPage
