'use strict';
module.exports = {
  url: 'https://ebx-dev02.acosta.com',
  elements: {
    txtBoxLogin: {
      selector: 'input[name=login]',
      locateStrategy: 'css selector'
    },
    txtBoxPassword: {
      selector: 'input[name=password]',
      locateStrategy: 'css selector'
    },
    btnLogin: {
      selector: 'button[type=submit]',
      locateStrategy: 'css selector'
    },
    txtAreaAcostaTitle: {
      selector: '._ebx-login-page_form_title',
      locateStrategy: 'css selector'
    },
    // txtDataSpaceName: {
    //   selector: '//li[@data-key="LegacyDataSet"]',
    //   locateStrategy: 'xpath'
    // },
    btnCreateDataSet: {
      selector: '//span[.="Create a dataset"]',
      locateStrategy: 'xpath'
    }

  },
  commands: [{
    loginEBX(username, password) {
      return this
        .setValue('@txtBoxLogin', username)
        .setValue('@txtBoxPassword', password)
        .click('@btnLogin');
    }
  }]
};