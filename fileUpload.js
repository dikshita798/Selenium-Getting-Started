const { Builder, By, Key } = require('selenium-webdriver')

describe('Checkout file upload demo website', () => {
  let driver
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  it('file upload', async () => {
    await driver.get('https://cgi-lib.berkeley.edu/ex/fup.html')
    const fileUploadField = await driver.findElement(By.name('upfile'))
    fileUploadField.sendKeys('E://selenium-getting-started//test.js')
    await driver.findElement(By.css('input[type="submit"]')).sendKeys(Key.ENTER)
    await driver.sleep(5000)
  })

  after(async () => await driver.quit())
})

// describe('Checkout Formy', () => {
//   let driver
//   before(async () => {
//     driver = await new Builder().forBrowser('chrome').build()
//   })

//   it('file upload', async () => {
//     await driver.get('http://formy-project.herokuapp.com/fileupload')
//     const fileUploadField = await driver.findElement(By.id('file-upload-field'))
//     fileUploadField.sendKeys('E://selenium-getting-started//test.js')
//     await driver.sleep(5000)
//   })

//   after(async () => await driver.quit())
// })
