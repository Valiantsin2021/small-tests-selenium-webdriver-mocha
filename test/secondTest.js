const {Builder, By, Key, WebDriver} = require("selenium-webdriver");
require("chromedriver");
// let assert = require("assert");
let should = require("chai").should();

describe("search Google with specified keywords tests", async function(){
    
    beforeEach(async function(){
        driver = await new Builder().forBrowser("chrome").build();
        await driver.get("https://google.com");
        await driver.findElement(By.xpath("//button[@id='L2AGLb']")).click();
    });
    
    afterEach(async function(){
        await driver.quit();
    });

    it("successfully searches Google 'Hello js Selenium'", async function(){
    
        await driver.findElement(By.name("q")).sendKeys("Hello js Selenium", Key.ENTER);
        let title = await driver.getTitle().then(function(value){return value});
        console.log(title);
        // await assert.strictEqual(title, "Hello js Selenium - Поиск в Google");
        await title.should.equal("Hello js Selenium - Поиск в Google");    
    });

    it("successfully searches Google 'Hello'", async function(){
            
        await driver.findElement(By.name("q")).sendKeys("Hello", Key.ENTER);
        let title = await driver.getTitle().then(function(value){return value});
        console.log(title);
        // await assert.strictEqual(title, "Hello - Поиск в Google");
        await title.should.equal("Hello - Поиск в Google");
    });
});