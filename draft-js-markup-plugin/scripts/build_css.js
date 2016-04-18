var exec = require('child_process').exec;
var path = require('path');

var command_line = path.normalize('node ../scripts/concatCssFiles');

if (process.platform === 'win32') {
   command_line = command_line + ' %cd%&&';
} else {
   command_line = command_line + " $(pwd) &&";
}

command_line = command_line + ' ../node_modules/.bin/rimraf lib-css';

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
