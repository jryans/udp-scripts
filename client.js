var dgram = require('dgram');

//if (process.argv.length < 3) {
  //console.log('Not enough args');
  //process.exit(1);
//}

// Ports: 50624, 50625

var socket = dgram.createSocket('udp4');

socket.bind(null, null, function() {
  var address = socket.address();
  console.log('Listening: ' + address.address + ':' + address.port);
  socket.addMembership('224.0.0.115');
});

socket.on('message', function(msg, rinfo) {
  console.log('Got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
});

setInterval(function() {
  var data = {
    'device': 'flame-0d3ed178',
    'services': {
      'devtools': {
        'port': 40257
      }
    },
    'from': '192.168.1.143'
  };
  var msg = new Buffer(JSON.stringify(data, null, 2));
  var addr = '224.0.0.115';
  var port = 50625;
  socket.send(msg, 0, msg.length, port, addr, function(err) {
    if (err) {
      console.error('Send to ' + addr + ':' + port + ' failed: ' + err);
    }
    console.log('Send to ' + addr + ':' + port + ' succeeded.');
  });
}, 2000);
