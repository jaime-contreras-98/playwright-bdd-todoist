var common = [
  `--format ${process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
  }`,
  'features/*.feature',
  '--format json:./reports/cucumber-json-reports/report.json',
  '--format rerun:./reports/@rerun.txt',
  '--format usage:./reports/usage.txt',
  '--parallel 4',
  '--require ./features/step-definitions/*.ts',
  '--require ./features/step-definitions/hooks/*.ts',
  '--require-module ts-node/register'
  //'--require ./build/tests/support/*.js'
].join(' ');

module.exports = {
  default: common
};