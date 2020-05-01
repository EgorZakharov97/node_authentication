const cpus = require('os').cpus(),
	cluster = require('cluster'),
	http = require('http');

if(cluster.isMaster){
	console.log('This is the master process:', process.pid);
	for( let i = 0; i < cpus.length-1; i++){
		const worker = cluster.fork();
		worker.on('exit', () => {
			console.log('Worker died! Pid: ' + worker.process.pid);
			cluster.fork();
		})
	}
} else {
	console.log('Worker created');
	require('./worker');
}