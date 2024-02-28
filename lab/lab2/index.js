const toplam = require("./math");
// console.log(toplam.add(5, 3));

// package.json dosyasına "type": "module", ekle
// import { add, sub } from "./es_math.js"
// console.log(add(5, 3));
// console.log(sub(5, 3));

// dosya islemleri fs - error func.
const fs = require('fs');

fs.readFile('es_math.js', 'utf-8', (err, data) => {
    if (err) throw err;
    // console.log(data);
});

// os
const os = require("os");
// console.log(`Hostnama: ${os.hostname()}`);

// simple server
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello, World!");
});
server.listen(3000);

const { EventEmitter } = require('events');
const myEmitter = new EventEmitter();
// myEmitter.on('myEvent', ()=> console.log('Event triggerred'));
// myEmitter.emit('myEvent');