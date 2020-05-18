#!/usr/bin/env node

const execSync = require('child_process').execSync;
const url = 'https://7da41fee.ngrok.io';
const reportOutputDir = 'hotjar';
const howManyReports = 10; // Change this to be the number of tests you want to do

console.log(`Reports will be delivered on directory ${reportOutputDir}`);
for (let i = 0; i < howManyReports; i++) {
  console.log(`Starting performance test ${i + 1}`);
  try {
    execSync(
      `cd ${reportOutputDir} && ` +
        `lighthouse ${url} --output json --output html --only-categories=performance --quiet --chrome-flags="--headless"`
    );
  } catch (err) {
    console.log(`Performance test ${i + 1} failed`);
    break;
  }
  console.log(`Finished running performance test ${i + 1}`);
}
console.log(`All finished`);