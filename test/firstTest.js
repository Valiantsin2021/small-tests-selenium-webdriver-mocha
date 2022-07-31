const {Builder, By, Key, WebDriver} = require("selenium-webdriver");
require("chromedriver");
let assert = require("assert");
let expect = require('expect')
const { user, pass } = require('../utils/credentials.js')
const { urlMail, emaillName, pageTitle, headers} = require('../utils/constants.js')

describe("Smoke test for mail.ru", async function(){
    
    after(async function(){
        await driver.quit();
    });

    it("Should login email account succesfully", async function(){
        driver = await new Builder().forBrowser("chrome").build();

        await driver.manage().setTimeouts( { implicit: 10000 } );

        await driver.get(urlMail);
        await driver.manage().window().maximize();
        await driver.findElement(By.xpath("//button[@data-testid='enter-mail-primary']")).click();

        const iframe = await driver.findElement(By.css('div.ag-popup__frame__layout.ag-popup__frame__layout-desktop > iframe'))
        await driver.switchTo().frame(iframe);


        await driver.findElement(By.xpath("//input[@name='username']")).sendKeys(user, Key.ENTER);
        
        await driver.findElement(By.xpath("//input[@name='password']")).sendKeys(pass, Key.ENTER);       
        
        await driver.switchTo().defaultContent();
        console.log(await driver.getTitle())

        await assert.equal(await driver.getTitle(), pageTitle)
    
    });

    it("Should check name of email account is correct", async function(){

        const accountHeader = await driver.findElement(By.css("span.ph-project__user-name.svelte-1hiqrvn"))
        .getText()
        .then((accountHeader) => { return accountHeader; });

        console.log(accountHeader);
        await assert.strictEqual(accountHeader, emaillName);

        
    });

    it("Should check unread messages", async function(){

        await driver.findElement(By.css("a[href='/inbox/']")).click()
        const incomming = await driver.findElements(By.css(".llc.llc_normal.llc_new.llc_new-selection.js-letter-list-item.js-tooltip-direction_letter-bottom"))
        for(let message of incomming) {
            let text = message.getText()
            return text
        }
        await expect(text).toInclude(headers)
    });
});

