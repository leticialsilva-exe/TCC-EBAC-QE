const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false, 
    browser: 'electron',
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true, // Show charts in report
      embeddedScreenshots: true, // Embed screenshots in report
      inlineAssets: true, // Embed assets (like images) in report
      saveAllAttempts: false, // Don't save all attempts (saves space)
      // If you want merged reports:
      // reportFilename: "my-test-report", // Custom report name
    }

  },
});
