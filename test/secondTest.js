const {Builder, By, Key, until} = require("selenium-webdriver");
require("chromedriver");
let should = require("chai").should();
let assert = require("assert");
const {urlAmazon, titleAmazon, searchAmazon, searchTitle, price} = require('../utils/constants.js')

describe("Should succesfully search Amazon.es with specified keywords tekts", async function(){
    
    after(async function(){
        await driver.quit();
    });

    it("Should successfully open Amazon.es page", async function(){

        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().setTimeouts( { implicit: 10000 } );
        await driver.manage().window().maximize();
        await driver.get(urlAmazon);
        await assert.equal(await driver.getTitle(), titleAmazon)
    });

    it("Should successfully search Amazon.es page 'Roomba'", async function(){
        let cookies = await driver.wait(until.elementLocated(By.css('#sp-cc-accept')), 2000)
        await cookies.click();
        let search = await driver.wait(until.elementLocated(By.css('#twotabsearchtextbox')), 2000)
        await search.sendKeys(searchAmazon, Key.ENTER)
        const results = await driver.wait(until.elementLocated(By.xpath("//span[text()='RESULTADOS']")), 2000)
        await assert.equal(await results.getText(), searchTitle)

    });

    it("Should check price of Roomba i7556", async function(){
            
        let roomba = await driver.wait(until.elementLocated(By.xpath('//span[text()="Robot Aspirador iRobot Roomba i3+ - Autovaciado de Suciedad - Ideal para Mascotas - Sugerencias Personalizadas - Compatible con tu Asistente de Voz - Color Gris Azulado"]')), 2000)
        await roomba.click()
        let priceReceived = await driver.wait(until.elementLocated(By.css('#corePriceDisplay_desktop_feature_div  span.a-price-whole')), 2000)
        await assert.strictEqual(await priceReceived.getText(), price)
    });

    it("Should check image of Roomba i7556 is present", async function(){
        let image = await driver.wait(until.elementLocated(By.css('#imgTagWrapperId')), 2000)
        await assert.ok(true, image)
    });
});