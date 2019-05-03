var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicituado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  num_clients += 1;
  socket.emit('new_message', 'Bienvenido a este chat');
  socket.broadcast.emit('new_message', 'Se ha conectado un nuevo usuario');

//-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
    num_clients -= 1;
    socket.broadcast.emit('new_message', 'Se ha desconectado un usuario');
  });


  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {

    //-- Notificarlo en la consola del servidor
    console.log("Mensaje recibido: " + msg)

    //-- Emitir un mensaje a todos los clientes conectados
    io.emit('new_message', msg);
  });

});

var option = process.openStdin();
var num_clients = 0;
var now = new Date();
var day = now.getDate();
var month = now.getMonth() + 1;
var year = now.getFullYear();


  option.addListener("data", function(d) {
    if(d.toString().trim() == "/help"){
      console.log("Opciones de este servidor: ");
      console.log("/help");
      console.log("/list");
      console.log("/hello");
      console.log("/date");
    } else if(d.toString().trim() == "/list"){
        console.log(num_clients);

    } else if(d.toString().trim() == "/hello"){
        console.log("Hola, soy el servidor :D");
    } else if(d.toString().trim() == "/date"){
        console.log('La fecha actual es: ' + day + '-' + month + '-' + year)
    } else{
      console.log("Introduzca un comando válido");
    }
  });















