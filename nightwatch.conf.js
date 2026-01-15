module.exports = (function (settings) {
  console.log(settings["test_settings"]["default"]["username"]);

  // Username from Jenkins
  if (process.env.LT_USERNAME) {
    settings["test_settings"]["default"]["username"] = process.env.LT_USERNAME;
  }

  // Access key from Jenkins
  if (process.env.LT_ACCESS_KEY) {
    settings["test_settings"]["default"]["access_key"] = process.env.LT_ACCESS_KEY;
  }

  // Selenium host override
  if (process.env.SELENIUM_HOST) {
    settings.selenium.host = process.env.SELENIUM_HOST;
  }

  // Selenium port override (fixed small bug: was assigning to host earlier)
  if (process.env.SELENIUM_PORT) {
    settings.selenium.port = process.env.SELENIUM_PORT;
  }

  // Build name from Jenkins → LambdaTest
  if (process.env.LT_BUILD_NAME) {
    settings.test_settings.default.desiredCapabilities["LT:Options"] =
      settings.test_settings.default.desiredCapabilities["LT:Options"] || {};
      
    settings.test_settings.default.desiredCapabilities["LT:Options"]["build"] =
      process.env.LT_BUILD_NAME;
  }

  console.log(settings);
  return settings;
})(require("./nightwatch.json"));
