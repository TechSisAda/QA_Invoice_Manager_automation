import 'dotenv/config'

export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.spec.js',
        './test/specs/**/*.e2e.js'
    ],
    exclude: [],
    maxInstances: 5,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.HEADLESS === 'false'
                ? []
                : ['--headless', '--disable-gpu', '--window-size=1440,900', '--no-sandbox', '--disable-dev-shm-usage']
        }
    }],
    logLevel: 'warn',
    bail: 0,
    baseUrl: process.env.BASE_URL || 'https://invoicemanager.ng',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [['chromedriver', {
        port: 9515,
        logFileName: 'wdio-chromedriver.log'
    }]],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        retries: 1
    },
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false,
            addConsoleLogs: true
        }]
    ],

    afterTest: async function (test, context, { error, passed }) {
        if (!passed) {
            await browser.takeScreenshot()
        }
    }
}
