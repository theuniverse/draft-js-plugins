var exec = require('child_process').exec;
var path = require('path');

var command_line = path.normalize('../node_modules/.bin/rimraf') + ' lib';

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
