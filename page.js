module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    messageDriver: '#comment',
    codeField: '#code',
  

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div=Supportive',
    
    
   //Adding a credit card
    paymentMethodButton: '.pp-value-text',
    addCardButton: '.pp-plus',
    inputCardNumber: '#number', 
    inputCardCode: '.card-code #code',
    cardSignatureStrip: '.plc',
    linkCardButton:'button=Link',
    closePaymentButton: '.payment-picker.open .close-button.section-close', 
    
    
    //Ordering Items
    blanketSwitch: '.switch',
    blanketCheck: '.switch-input',
    addingIceCream: '.counter-plus',
    iceCreamCounter: '.counter-value',
    // Modals
    phoneNumberModal: '.modal',
    orderBodyModal: '.order-body',
 
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
        return supportiveButton;
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
    sendAmessageToDriver: async function (message) {
        const messageDriver = await $(this.messageDriver);
        await messageDriver.waitForDisplayed();
        messageDriver.setValue(message);
    },

    //Ordering Blanket and Handkerchiefs 
    orderBlanket: async function () {
        const blanketSwitch = await $(this.blanketSwitch);
        await blanketSwitch.click();
    },

    //Ordering Ice Cream 
    orderIceCream: async function () {
        const addingIceCream = await $(this.addingIceCream);
        await addingIceCream.click();
        await addingIceCream.click();

    },

    //Car search modal should appear 
    orderAcar: async function () {
        const orderBodyModal = await $(this.orderBodyModal);
        await orderBodyModal.waitForExist();

    },
    
};