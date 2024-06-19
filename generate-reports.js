#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');
const { getReportsPath } = require('./get-reports-path');

const appUrl = process.env.APP_URL;
const howManyReports = 5; // Change this to be the number of tests you want to do
const siteReportOutputDir = getReportsPath({ appUrl });

console.log(`${howManyReports} reports will be delivered on directory ${siteReportOutputDir}`);


if (!fs.existsSync(siteReportOutputDir)) {
  fs.mkdirSync(siteReportOutputDir, { recursive: true });
}

for (let i = 0; i < howManyReports; i++) {
  console.log(`Starting performance test ${i + 1}`);
  

  try {
    execSync(
      `cd ${siteReportOutputDir} && ` +
        `lighthouse ${appUrl} --output json --output html --only-categories=performance --quiet --chrome-flags="--headless"`
    );
  } catch (err) {
    console.log(`Performance test ${i + 1} failed`);
    break;
  }
  console.log(`Finished running performance test ${i + 1}`);
}
console.log(`All finished`);
