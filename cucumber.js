var common = [
  `--format ${process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
  }`,
  'features/*.feature',
  '--format json:./reports/cucumber-json-reports/report.json',
  '--format rerun:@rerun.txt',
  '--format usage:usage.txt',
  '--parallel 20',
  '--require ./features/step-definitions/*.ts',
  '--require-module ts-node/register'
  //'--require ./build/tests/support/*.js'
].join(' ');

module.exports = {
  default: common
};