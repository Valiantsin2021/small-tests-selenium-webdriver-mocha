const {Builder, By, Key, WebDriver} = require("selenium-webdriver");
require("chromedriver");
let assert = require("assert");
// const { IncomingMessage } = require("http");
let should = require("chai").should();
const { user, pass } = require('../credentials.js')

describe("smoke test for mail.ru", async function(){
    
    after(async function(){
        await driver.quit();
    });

    it("check email account entered correctly", async function(){
        driver = await new Builder().forBrowser("chrome").build();

        await driver.manage().setTimeouts( { implicit: 10000 } );

        await driver.get("https://mail.ru");
        await driver.manage().window().maximize();
        await driver.findElement(By.xpath("//button[@data-testid='enter-mail-primary']")).click();

        const iframe = await driver.findElement(By.css('div.ag-popup__frame__layout.ag-popup__frame__layout-desktop > iframe'))
        await driver.switchTo().frame(iframe);


        await driver.findElement(By.xpath("//input[@name='username']")).sendKeys(user, Key.ENTER);
        
        await driver.findElement(By.xpath("//input[@name='password']")).sendKeys(pass, Key.ENTER);       
        
        await driver.switchTo().defaultContent();

        const accountHeader = await driver.findElement(By.css("span.ph-project__user-name.svelte-1hiqrvn"))
        .getText()
        .then((accountHeader) => { return accountHeader; });

        console.log(accountHeader);
        await assert.strictEqual(accountHeader, "gracev.belbisnesresurs@mail.ru");

        
    });

    it("check unread messages", async function(){

        await driver.findElement(By.css("a[href='/inbox/']")).click()
        const incomming = driver.wait(function() {
            return driver.findElements(WebDriver.By.css(".llc.llc_normal.llc_new.llc_new-selection.js-letter-list-item.js-tooltip-direction_letter-bottom"))
            .then(function(elems) {
                var length = elems.length; // Here's your length!
                return length
            });
          }, 3000, 'Failed to find element after 3 seconds');
        
        await assert.notStrictEqual(true, incomming)
        
        console.log(incomming);
       

    });

});

