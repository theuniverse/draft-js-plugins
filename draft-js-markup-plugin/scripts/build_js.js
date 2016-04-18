var exec = require('child_process').exec;
var path = require('path');

var command_line = path.normalize('../node_modules/.bin/babel');

if (process.platform === 'win32') {
   command_line = 'set WEBPACK_CONFIG=%cd%/webpack.config.js&& set BABEL_DISABLE_CACHE=1&& set BABEL_ENV=production&& set NODE_ENV=production&& ' + command_line + ' --out-dir=lib --ignore=__test__/* src';
} else {
   command_line = 'WEBPACK_CONFIG=$(pwd)/webpack.config.js BABEL_DISABLE_CACHE=1 BABEL_ENV=production NODE_ENV=production ' + command_line + " --out-dir='lib' --ignore='__test__/*' src";
}

var command = exec(command_line);

command.stdout.on('data', function(data) {
   process.stdout.write(data);
});
command.stderr.on('data', function(data) {
   process.stderr.write(data);
});
command.on('error', function(err) {
   process.stderr.write(data);
});
