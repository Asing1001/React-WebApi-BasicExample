var express = require('express');
var fetch = require('node-fetch');
var bodyParser = require('body-parser');


var app = express();
app.use(express.static(__dirname));
// parse application/json
app.use(bodyParser.json());

app.get('/api/getNetentSessionId', function (req, res) {
    var content = JSON.stringify(req.query);
    console.log(content);
    fetch('http://netent.188bet.qat/NetEntService.svc/loginuser',
        {
            method: 'POST', body: content,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (res) {
            return res.text();
        }, function (err) {
            console.log(err);
        }).then(function (text) {
            console.log(text);
            res.send(text);
        });
});

app.listen(process.env.PORT || 3333, function () {
    console.log('app listen on 3333');
});