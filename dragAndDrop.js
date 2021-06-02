const { Browser, By, Key, until } = require('selenium-webdriver')
const { suite } = require('selenium-webdriver/testing')
const assert = require('assert')
const DragAndDropPage = require('./pages/dragAndDropPage.js')

suite(function (env) {
  describe('Drag and Drop Demo', () => {
    let driver
    let page
    before(async () => {
      driver = await env.builder().build()
      page = new DragAndDropPage(driver)
      await page.open()
    })

    it('Updated status text', async () => {
      await page.dragDrop()
      let droppable = await driver.findElement(page.locators.droppable)
      var text = await droppable.getText()

      assert(text.includes('Dropped'))
    })

    after(async () => driver.quit())
  })
})
