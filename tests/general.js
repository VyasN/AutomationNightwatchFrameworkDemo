'use strict';
require('dotenv').config();
const user = process.env.EBXUsername;
const pwd = process.env.EBXPassword;
module.exports = {
  after: function (browser) {
    browser.end();
  },
  '@tags': ['login', 'sanity'],
  'Ensure a SSL certification has been established': function (browser) {
    var general = browser.page.login();
    general
      //url with http and https will check redirect but just domain name with out protocol(http/s) can not handle by selenium
      .navigate("http://ebx-dev02.acosta.com")
      .waitForElementVisible('@txtAreaAcostaTitle', 'verify login form of ebx')
      .assert.containsText('@txtAreaAcostaTitle', 'Acosta - Manage your most important data with EBX', 'verify Acost title after redirect');
  },
  '@tags': ['login', 'sanity'],
  'Enter a valid Username and Password in EBX': function (browser) {
    var general = browser.page.login();
    general
      .navigate()
      .waitForElementVisible('@txtAreaAcostaTitle', 'verify login form is visible')
      .loginEBX(user, pwd)
      .assert.title("Acosta - MDM", 'verify page title after loggedin')
      .waitForElementVisible('@btnCreateDataSet', 'verify data set button is visible')
      .assert.containsText('@btnCreateDataSet', 'Create a dataset', 'verify user can see create data space option');
  }
};