#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');

const appUrl = process.env.APP_URL;
const reportOutputDir = process.argv[2] || 'reports';
const howManyReports = 5; // Change this to be the number of tests you want to do

console.log(`${howManyReports} reports will be delivered on directory ${reportOutputDir}`);
for (let i = 0; i < howManyReports; i++) {
  console.log(`Starting performance test ${i + 1}`);
  if (!fs.existsSync(reportOutputDir)) {
    fs.mkdirSync(reportOutputDir);
  }

  try {
    execSync(
      `cd ${reportOutputDir} && ` +
        `lighthouse ${appUrl} --output json --output html --only-categories=performance --quiet --chrome-flags="--headless"`
    );
  } catch (err) {
    console.log(`Performance test ${i + 1} failed`);
    break;
  }
  console.log(`Finished running performance test ${i + 1}`);
}
console.log(`All finished`);
