const reportOutputDir = process.argv[2] || 'reports';

const getReportsPath = ({ appUrl }) => {
    return `${reportOutputDir}/${appUrl.replace('http://', '').replace('https://', '').replace('/', '^^^').replaceAll('/', '__').replace('^^^', '/')}`
}

module.exports = {
    getReportsPath
}