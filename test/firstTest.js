const {Builder, By, Key, until} = require("selenium-webdriver");
let assert = require("assert");
let expect = require('expect')
const { user, pass } = require('../utils/credentials.js')
const { urlMail, emaillName, pageTitle, headers} = require('../utils/constants.js')
describe("Smoke test for mail.ru", async function(){
    after(async function(){
        await driver.quit();
    });
    it("Should login email account succesfully", async function(){
        const capabilities = {"goog:chromeOptions": {"args": ["--headless", "--no-sandbox", "--disable-dev-shm-usage"]}}
        driver = await new Builder().withCapabilities(capabilities).forBrowser("chrome").build();
        await driver.manage().setTimeouts( { implicit: 10000 } );
        await driver.get(urlMail);
        await driver.manage().window().maximize();
        const email = await driver.wait(until.elementLocated(By.xpath("//button[@data-testid='enter-mail-primary']")), 2000)
        await email.click();
        const iframe = await driver.findElement(By.css('div.ag-popup__frame__layout.ag-popup__frame__layout-desktop > iframe'))
        await driver.switchTo().frame(iframe);
        const emailUser = await driver.wait(until.elementLocated(By.xpath("//input[@name='username']")), 3000)
        await emailUser.sendKeys(user, Key.ENTER);
        const emailPass = await driver.wait(until.elementLocated(By.xpath("//input[@name='password']")), 3000)
        await emailPass.sendKeys(pass, Key.ENTER);       
        await driver.switchTo().defaultContent();
        console.log(await driver.getTitle())
        await assert.equal(await driver.getTitle(), pageTitle)
    
    });
    it("Should check name of email account is correct", async function(){
        const accountHeader = await driver.wait(until.elementLocated(By.css("span.ph-project__user-name.svelte-1hiqrvn")), 3000)
        .getText()
        .then((accountHeader) => { return accountHeader; });
        console.log(accountHeader);
        await assert.strictEqual(accountHeader, emaillName);
    });
    it("Should check unread messages", async function(){
        const popup = await driver.wait(until.elementLocated(By.css("a[class='ph-project svelte-jq5qv5 ph-project_current']")),2000)
        await popup.click()
        const inbox = await driver.wait(until.elementLocated(By.css("a[href='/inbox/']")), 3000)
        await inbox.click()
        const incomming = await driver.wait(until.elementsLocated(By.css(".llc.llc_normal.llc_new.llc_new-selection.js-letter-list-item.js-tooltip-direction_letter-bottom")), 3000)
        for(let message of incomming) {
            let text = await message.getText()
            return text
        }
        await expect(text).toInclude(headers)
    });
});
