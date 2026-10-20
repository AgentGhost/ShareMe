// Resolve Chrome on Windows when CHROME_BIN is not set (karma-chrome-launcher
// only auto-detects on Linux/macOS).
if (!process.env.CHROME_BIN && process.platform === "win32") {
  const fs = require("fs")
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ]
  const found = candidates.find(path => fs.existsSync(path))
  if (found) {
    process.env.CHROME_BIN = found
  }
}

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false,
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    singleRun: true,
  })
}