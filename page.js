module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '//*[@id="number"]',
    writeAmessageBox: '/html/body/div[1]/div/div[3]/div[3]/div[2]/div[2]/div[3]/div',
    messageDriver: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[5]',
    orderCarNowButton:'//*[@id="root"]/div/div[3]/div[4]/button',
    
   //Adding a credit card
    paymentMethodButton: '.pp-text',
    addCardButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]/div[2]',
    inputCardNumber: '//*[@id="number"]', 
    inputCardCode: '/html/body/div[1]/div/div[2]/div[2]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input',
    linkCardButton:'button=Link',
    closePaymentButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/button', 
    cardSignatureStrip: '.plc',
    
    //Ordering Items
    orderRequirementsSelector: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]',
    blanketSwitch: '/html/body/div[1]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div',
    addingIceCream: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[3]',
    // Modals
    phoneNumberModal: '.modal',
    orderBodyModal:'/html/body/div[1]/div/div[5]/div[2]',
 
    // Functions

    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },

    
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },


    selectSupportivePlan: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.click();
    },

    // Fill card information 
    fillCreditCardNumber: async function(creditCardNumber,code) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.click();
        //adding a card 
        const addCardButton = await $(this.addCardButton);
        await addCardButton.click();
        const inputCardNumber = await $(this.inputCardNumber);
        await inputCardNumber.setValue(creditCardNumber)
        const inputCardCode = await $(this.inputCardCode);
        await inputCardCode.setValue(this.inputCardCode);
        const cardSignatureStrip = await $(this.cardSignatureStrip);
        await cardSignatureStrip.click();
        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.click();
        const closePaymentButton = await $(this.closePaymentButton);
        await closePaymentButton.click();
    },
   
    //Messaging driver
    sendAmessageToDriver: async function () {
        const writeAmessageBox = await $(this.writeAmessageBox);
        await writeAmessageBox.click();
        const messageDriver = await $(this.messageDriver);
        await messageDriver.click();
        await messageDriver.waitForDisplayed();
        messageDriver.setValue('I will be bringing my dog');
    },

    //Ordering Blanket and Handkerchiefs 
    orderBlanket: async function () {
        const orderRequirementsSelector = await $(this.orderRequirementsSelector);
        await orderRequirementsSelector.click();
        const blanketSwitch = await $(this.blanketSwitch);
        await blanketSwitch.click();
    },

    //Ordering Ice Cream 
    orderIceCream: async function () {
        const orderRequirementsSelector = await $(this.orderRequirementsSelector);
        await orderRequirementsSelector.click();
        const addingIceCream = await $(this.addingIceCream);
        await addingIceCream.click();
        await addingIceCream.click();

    },

    //Car search modal should appear 
    orderAcar: async function () {
        const orderCarNowButton = await $(this.orderCarNowButton);
        await orderCarNowButton.click();
        const orderBodyModal = await $(this.orderBodyModal);
        await orderBodyModal.waitForExist();

    },
    
};




