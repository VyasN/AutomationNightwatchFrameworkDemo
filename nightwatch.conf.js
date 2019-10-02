const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');
const SCREENSHOT_PATH = "./screenshots/";
// const geckodriver = require('geckodriver');

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  src_folders: ["tests"],
  page_objects_path: 'pageobjects',
  output_folder: 'reports',
  custom_assertions_path: '',
  live_output: false,
  disable_colors: false,
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost',
      check_process_delay: 1000,
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false
        }
      },
      test_workers: {
        enabled: true,
        workers: "auto"
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        }
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      loggingPrefs: {
        driver: 'INFO',
        server: 'OFF',
        browser: 'INFO'
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        }
      }
    }
    //we will use it when we need to do cross-browser settings
    //   firefox: {
    //     desiredCapabilities: {
    //       browserName: 'firefox',
    //       javascriptEnabled: true,
    //       marionette: true
    //     },
    //     selenium: {
    //       cli_args: {
    //         'webdriver.gecko.driver': geckodriver.path
    //       }
    //     }
    //   },
  }
};

function padLeft(count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;