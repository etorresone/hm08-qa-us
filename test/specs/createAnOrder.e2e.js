const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($('#from')).toBeExisting('East 2nd Street, 601');
        await expect($('#to')).toBeExisting('1300 1st St');
        
    })
    
    it('select the supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await expect ($('//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[5]')).toBeExisting();
     
    })

     it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })
    
    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const inputCardNumber = helper.getCreditCardNumber();
        const inputCardCode = helper.getCardNumberCode();
        await page.fillCreditCardNumber(inputCardNumber,inputCardCode);
        await expect ($('//*[@id="number"]')).toBeExisting();
        await expect ($('/html/body/div[1]/div/div[2]/div[2]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input')).toBeExisting();
    })

    
   it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.sendAmessageToDriver('I will be bringing my dog');
        await browser.pause(2000);
        await expect ($('#comment')).toHaveValue('I will be bringing my dog');
    
    })
    
     it('should order blanket', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderBlanket();
        await expect ($('//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]')).toBeExisting();
    })

    it('should order ice cream', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderIceCream();
        await browser.pause(3000);
        await expect ($('//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[3]')).toBeExisting();

    })
    it('car search modal should appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        const inputCardNumber = helper.getCreditCardNumber();
        const inputCardCode = helper.getCardNumberCode();
        await page.fillCreditCardNumber(inputCardNumber,inputCardCode);
        await page.sendAmessageToDriver('I will be bringing my dog');
        await page.orderAcar();
        await browser.pause(40000);
        await expect ($('/html/body/div[1]/div/div[5]/div[2]')).toBeExisting();

    })
})