var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis').createClient();
redis.subscribe('apicalls');
app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.listen(8080);

app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("connected!!");
  redis.on('message', function(channel, message){
   socket.emit(channel, JSON.parse(message));
    
  });
});