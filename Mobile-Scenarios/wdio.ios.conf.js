export const config = {

    // runner: 'local',
    // port: 4723,

    user: 'oauth-leehslash-c819e',
    key: 'bc299a1e-6faa-4970-a00e-3547e350caef',
    hostname: 'ondemand.us-west-1.saucelabs.com',
    port: 443,
    baseUrl: 'wd/hub',
      
    specs: [
        './test/specs/**/*.test.js'
    ],
    suites: {
        login: [
            './test/specs/login.test.js'
        ],
        signUp: [
            './test/specs/signUp.test.js'
        ],
        cart: [
            './test/specs/cart.test.js'
        ],
        map: [
            './test/specs/map-elements.test.js'
        ]
    },
    services: [
        ['appium', {
            command: 'appium',
            args: {
                port: 443,
                relaxedSecurity: true
            }
        }]
    ],
    maxInstances: 1,
    capabilities: [
        // SAUCE LABS CONFIG
        {
        platformName: 'iOS',
        'appium:app': 'storage:filename=loja-ebac.app.zip',
        'appium:deviceName': 'iPhone Simulator',
        'appium:platformVersion': '15.0',
        'appium:automationName': 'XCUITest',
        'sauce:options': {
            appiumVersion: '2.0.0',
            build: 'appium-build-teste-ebacshop',
            name: 'Teste Ebac Shop iOS',
            deviceOrientation: 'PORTRAIT',
        },
        }

        // Local configs
        // {
        //     "platformName": "iOS",
        //     "appium:platformVersion": "18.2",
        //     "appium:deviceName": "iPhone 15",
        //     "appium:automationName": "XCUITest",
        //     "appium:app": `${process.cwd()}/app/app/ios/loja-ebac.app`,
        //     // "appium:udid": "0C65B04D-D387-4D99-A317-DE374797C139", // local only — removed for CI
        //     "appium:appWaitActivity": ".MainActivity",
        //     "appium:disableIdLocatorAutocompletion": true,
        //     //"appium:noReset": true, // Set noReset to true if you want to keep the app and its data on the simulator between test runs.
        //     //"appium:fullReset": false // Ensure fullReset is set to false if you want to avoid a complete simulator reset and potential recreation.
        // }
        // {
        //     platformName: 'Android',
        //     'appium:app': 'storage:filename=ebacshop.aab', // The filename of the mobile app
        //     'appium:deviceName': 'Android GoogleAPI Emulator',
        //     'appium:platformVersion': '12.0',
        //     'appium:automationName': 'UiAutomator2',
        //     'appium:disableIdLocatorAutocompletion': true ,
        //     'sauce:options': { //SAUCE LABS OPTIONS
        //        build: 'appium-build-teste-ebacshop',
        //        name: 'EBAC Shop Test',
        //        deviceOrientation: 'PORTRAIT',
        //        appiumVersion: '2.0.0'
        //      },
        // }
    ],
    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec', 
        ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false}
        ]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
            await driver.takeScreenshot();
    }
}