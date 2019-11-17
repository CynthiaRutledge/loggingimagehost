const port = process.env['PORT'] || 8080

var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');

var dir = path.join(__dirname, 'images');

var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

app.get('*', function (req, res) {
    var filename = req.path.split(/\//).shift();
    var file = path.join(dir, filename);
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}/`);
});
