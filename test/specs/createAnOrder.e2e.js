const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toBeExisting('East 2nd Street, 601');
        await expect($(page.toField)).toBeExisting('1300 1st St');
        
    })
    
    it('select the supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportive = await page.selectSupportivePlan();
        await expect (supportive.parentElement()).toHaveElementClass('active');
     
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
        await expect ($(page.paymentMethodButton)).toHaveText('Card');
        
    })

    
   it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.sendAmessageToDriver('I will be bringing my dog');
        await browser.pause(2000);
        await expect ($(page.messageDriver)).toHaveValue('I will be bringing my dog');
    
    })
    
     it('should order blanket', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderBlanket();
        await expect ($(page.blanketCheck)).toBeChecked();
    })

    it('should order ice cream', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.orderIceCream();
        await browser.pause(3000);
        await expect ($(page.iceCreamCounter)).toHaveText("2");

    })
    it('car search modal should appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await page.sendAmessageToDriver('I will be bringing my dog');
        await page.orderAcar();
        await expect ($(page.orderBodyModal)).toBeExisting();

    })
})
    