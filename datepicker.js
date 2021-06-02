const { Builder, By, Key, until } = require('selenium-webdriver')

describe('Checkout Formy', async () => {
  let driver
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })
  it('Date picker', async () => {
    try {
      await driver.get('http://formy-project.herokuapp.com/datepicker')
      const dateField = await driver.findElement(By.id('datepicker'))
      dateField.click()

      await driver.wait(
        until.elementsLocated(By.className('datepicker-days')),
        10000
      )
      // sleep function and set Timeout not working in for loop for giving delays
      // let tr = [1, 2, 3, 4, 5, 6]
      // let td = [...tr, 7]
      // const timer = (ms) => new Promise((res) => setTimeout(res, ms))
      // tr.forEach(async (i) => {
      //   td.forEach(async (j) => {
      //     await dateField.click()
      //     await driver
      //       .actions()
      //       .click(dateField)
      //       .keyDown(Key.CONTROL)
      //       .sendKeys('a')
      //       .keyUp(Key.CONTROL)
      //       .sendKeys(Key.BACK_SPACE)
      //       .perform()
      //     let day = await driver
      //       .findElement(By.css('div.datepicker-days table.table-condensed'))
      //       .findElement(By.css(`tbody tr:nth-child(${i}) td:nth-child(${j})`))
      //     console.log('day : ', await day.getText())
      //     await day.click()
      //     await timer(3000 * (j - 29)) // then the created Promise can be awaited
      //     // await dateField.click()
      //     // for (let i = 0; i < 10; i++) {
      //     //   await dateField.sendKeys(Key.BACK_SPACE)
      //     // }
      //   })
      // })
      let i = 1
      let j = 1
      const interval = setInterval(async () => {
        await dateField.click()
        await driver
          .actions()
          .click(dateField)
          .keyDown(Key.CONTROL)
          .sendKeys('a')
          .keyUp(Key.CONTROL)
          .sendKeys(Key.BACK_SPACE)
          .perform()
        let day = await driver
          .findElement(By.css('div.datepicker-days table.table-condensed'))
          .findElement(By.css(`tbody tr:nth-child(${i}) td:nth-child(${j})`))
        console.log('day : ', await day.getText())
        await day.click()
        j = j + 1
        if (j === 8) {
          i = i + 1
          j = 1
        } else if (i == 7 && j == 8) {
          clearInterval(interval)
        }
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  })
})
