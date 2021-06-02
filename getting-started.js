const { Builder, By, Key } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')
let driver
;(async () => {
  try {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get('http://www.benjaminmoore.com')
    //-------------------------------
    //Window Management
    // const { width, height } = await driver.manage().window().getRect()
    // console.log(width, height)
    // await driver.manage().window().setRect({
    //   width: 1024,
    //   height: 768,
    // })
    // const { x, y } = await driver.manage().window().getRect()
    // console.log(x, y)
    // await driver.manage().window().setRect({
    //   x: 0,
    //   y: 0,
    // })
    // await driver.manage().window().maximize()
    // await driver.manage().window().minimize()
    // await driver.manage().window().fullscreen()
    //-------------------------------
    //Take Screenshot
    //returns base64 encoded string
    // let encodedString = await driver.takeScreenshot()
    // await fs.writeFileSync('./image.png', encodedString, 'base64')
    //-------------------------------
    //Take Element Screenshot
    // let element = await driver.findElement(By.css('nav'))
    // let encodedString = await element.takeScreenshot(true)
    // await fs.writeFileSync('./element image.png', encodedString, 'base64')
    //-------------------------------
    //Execute Script
    //stores the title element
    // let title = await driver.findElement(By.css('title'))
    // //Executing javaScript to capture innerText of header element
    // let text = await driver.executeScript(
    //   'return arguments[0].innerText',
    //   title
    // )
    // console.log(text)
    // let a = await (
    //   await (
    //     await (
    //       await (
    //         await (
    //           await (
    //             await driver.findElement(By.id('page'))
    //           ).findElement(By.id('global-footer'))
    //         ).findElement(By.className('container-fluid nocontent'))
    //       ).findElement(By.className('row subscribe'))
    //     ).findElement(By.className('col-xs-12'))
    //   ).findElement(By.css('div'))
    // ).findElement(By.css('p'))
    // const p = await driver.executeScript('return arguments[0].innerText', a)
    // console.log(p)
    //-------------------------------
    //Print Page
    // let opts = new chrome.Options()
    // driver = await new Builder()
    //   .forBrowser('chrome')
    //   .setChromeOptions(opts.headless())
    //   .build()
    // await driver.get('https://www.selenium.dev')
    // //await driver.get('https://www.benjaminmoore.com')
    // let base64 = await driver.printPage({ pageRanges: ['1-2'] })
    // await fs.writeFileSync('./test.pdf', base64, 'base64')
    //-------------------------------
    //Locators
    // const footerEmail = await driver
    //   .findElement(By.id('footerSubscribeInput'))
    //   .sendKeys('abc@gmail.com', Key.ENTER)
    // const fn = await driver.findElement(By.name('firstName'))
    // await fn.sendKeys('Demo')
    // await driver.findElement(By.name('lastName')).sendKeys('Demo')
    // await driver.findElement(By.name('zipCode')).sendKeys('99501')
    // const btn = await driver.findElement(By.id('subscribe-type'))
    // btn.click()
    // // const value = (
    // //   await (
    // //     await (
    // //       await driver.findElement(By.id('personal-info'))
    // //     ).findElement(By.className('dropdown-menu'))
    // //   ).findElements(By.css('li'))
    // // )[1]
    // const value = (
    //   await driver.findElements(By.css('#personal-info .dropdown-menu li'))
    // )[1]
    // // values.forEach(async (value) => {
    // //   v1 = await value.findElement(By.css('a'))
    // //   //let v2 = await driver.executeScript('return arguments[0].innerText', v1)
    // //   let v2 = await v1.getText()
    // //   console.log(v2)
    // // })
    // await value.click()
    // //await fn.sendKeys(Key.ENTER)
    // await (await driver.findElement(By.id('emailSubscribeBtn'))).click()
    //-------------------------------
    //Relative Locators
    const element = await (
      await driver.findElement(By.className('pairing-paint section'))
    ).findElement(By.className('spaces'))
    const midCell = (
      await (
        await element.findElements(By.className('row'))
      )[1].findElements(By.className('col-xs-4'))
    )[1]
    const midCellText = await (
      await midCell.findElement(By.css('.space .name span'))
    ).getText()
    console.log('Mid : ', midCellText)
    // not working
    // const aboveCell = await element.findElement(
    //   withTagName('spaces row col-xs-4').above(midCell)
    // )
    // const aboveCellText = await aboveCell.getText()
    // console.log('Above Mid : ', aboveCellText)
    //-------------------------------
  } catch (err) {
    console.log(err.message)
  } finally {
    //await driver.quit()
  }
})()

/* const { Builder, By, until } = require('selenium-webdriver')
const assert = require('assert')
let driver
;(async function Myfunction() {
  try {
    driver = await new Builder().forBrowser('chrome').build()
    //-------------------------------
    //navigate to
    await driver.get('http://selenium.dev')
    //-------------------------------
    //get current url
    const url = await driver.getCurrentUrl()
    console.log(url)
    //-------------------------------
    //Back
    await driver.navigate().back()
    //-------------------------------
    setTimeout(async () => {
      //Forward
      await driver.navigate().forward()
    }, 3000)
    //-------------------------------
    setTimeout(async () => {
      //Refresh
      await driver.navigate().refresh()
    }, 6000)
    //-------------------------------
    //get title
    const title = await driver.getTitle()
    console.log(title)
    //-------------------------------
    let originalWindow = await driver.getWindowHandle()
    assert((await driver.getAllWindowHandles()).length === 1)
    await driver
      .findElement(By.linkText('The Equal Justice Initiative'))
      .click()
    await driver.wait(
      async () => (await driver.getAllWindowHandles()).length === 2,
      10000
    )
    let windows = await driver.getAllWindowHandles()
    windows.forEach(async (handle) => {
      if (handle != originalWindow) {
        await driver.switchTo().window(handle)
      }
    })
    await driver.wait(
      until.titleIs('Donate to the Equal Justice Initiative'),
      15000
    )
    //-------------------------------
    //Opens a new tab ans switches to new tab
    let originalWindow = await driver.getWindowHandle()
    console.log('original : ', originalWindow)
    await driver.switchTo().newWindow('tab')
    console.log('new tab : ', await driver.getWindowHandle())
    let windows = await driver.getAllWindowHandles()
    let tab
    windows.forEach((handle) => {
      if (handle != originalWindow) {
        tab = handle
      }
    })
    await driver.get('http://www.google.com')
    //-------------------------------
    //Opens a new window and switches to new window
    await driver.switchTo().newWindow('window')
    console.log('new window : ', await driver.getWindowHandle())
    windows = await driver.getAllWindowHandles()
    let window
    windows.forEach((handle) => {
      if (handle !== originalWindow) {
        window = handle
      }
    })
    await driver.get('http://www.facebook.com')
    //-------------------------------
    setTimeout(async () => {
      console.log('Before closing : ', await driver.getWindowHandle())
      //Close the tab or window
      await driver.close()
      //Switch back to the old tab or window
      await driver.switchTo().window(tab)
      console.log('After Switch : ', await driver.getWindowHandle())
      setTimeout(async () => {
        console.log('Before closing : ', await driver.getWindowHandle())
        await driver.close()
        await driver.switchTo().window(originalWindow)
        console.log('After Switch : ', await driver.getWindowHandle())
        assert((await driver.getAllWindowHandles()).length === 1)
        //quitting the browser at the end of a session
        setTimeout(async () => {
          await driver.quit()
        }, 5000)
      }, 5000)
    }, 5000)
    //-------------------------------
    //-------------------------------
  } catch (err) {
    console.log('There is an error.')
    await driver.quit()
  } finally {
    //await driver.wait(
    //async () => (await driver.getAllWindowHandles()).length === 1,
    //30000
    //)
    //await driver.quit()
  }
})() */

/* const { By, util, Key, Builder } = require('selenium-webdriver')

const example = async () => {
  let driver = await new Builder().forBrowser('chrome').build()
  await driver.get('http://google.com')
  await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN)
}
example() */
