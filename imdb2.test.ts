import { Builder, By, until, Capabilities, WebDriver } from "selenium-webdriver";
const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

// We need to make a normal class
class MyPage {
    // You should have a WebDriver in each of your page objects.
    driver: WebDriver
    // A url can be very helpful to store in your page object
    url: string
    // Constructor is just a key word, we'll have a method that is used when we create a new
    // MyPage instance.
    // The arguments we give will replace those certain parameters inside of our page object.
    right: By = By.xpath('//*[@id="__next"]/main/div[2]/div[3]/div[8]/div/section[2]/div/div/div/div[3]')
    right2: By = By.xpath('//*[@id="__next"]/main/div[2]/div[3]/div[8]/div/section[2]/div/div/div/div[3]')
    right3: By = By.xpath('//*[@id="__next"]/main/div[2]/div[3]/div[8]/div/section[2]/div/div/div/div[3]')
    left: By = By.xpath('//*[@id="__next"]/main/div[2]/div[3]/div[8]/div/section[2]/div/div/div/div[1]')
    left2: By = By.xpath('//*[@id="__next"]/main/div[2]/div[3]/div[8]/div/section[2]/div/div/div/div[1]')
    constructor(url?: string, driver?: WebDriver) {
        // In order to access the different properties in the object, you have to use
        // the keyword "this"
        if (url) this.url = url

        if (driver) this.driver = driver
        else // This else will not run if we give our constructor a driver
            this.getDriver()
    }
    getDriver() {
        if (this.driver)
            return this.driver
        else
            return new Builder().withCapabilities(Capabilities.chrome()).build()
    }
    async navigate() {
        await this.driver.get(this.url)
    }
}

const page = new MyPage('https://www.imdb.com/', driver)

test('Open a movie from the Coming soon to theaters list', async () => {
    await page.navigate()
    await (await driver.findElement(page.right)).click();
    await (await driver.findElement(page.right2)).click();
    await (await driver.findElement(page.right3)).click();
    await (await driver.findElement(page.left)).click();
    await (await driver.findElement(page.left2)).click();
    await page.driver.quit()
})