const http = require('http');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
require('log-timestamp');

const server = http.createServer((req, res) => {
    
    async function staticExport() {
        console.log("------------------------")
        console.log("Running 'npm run export'")
        console.log("------------------------")

        try {
            const { stdout, stderr } = await exec('npm run export', { timeout: 10000 });

            console.log('stdout:', stdout);
            console.log('stderr:', stderr);

            res.write(stdout);
            res.write(stderr); 
            res.end();
        } catch (error) {
            console.log(error);
            res.write('Something went wrong, check the logs');
            res.end();
        }
    }

    staticExport();
});

server.listen(2601, () => {
    console.log("Started build server at http://localhost:2601");
});