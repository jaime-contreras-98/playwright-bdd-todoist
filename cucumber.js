var common = [
  `--format ${process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'}`,
  'features/*.feature',
  '--format allure-cucumberjs/reporter',
  '--format json:./reports/cucumber-json-reports/report.json',
  '--format rerun:./reports/@rerun.txt',
  '--format usage:./reports/usage.txt',
  '--parallel 5',
  '--require ./features/step-definitions/*.ts',
  '--require ./features/step-definitions/hooks/*.ts',
  '--require-module ts-node/register',
].join(' ');

module.exports = {
  default: common, 
  formatOptions: {
    resultsDir: "allure-results",
  }
};