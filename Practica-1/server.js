var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...")


http.createServer((req,res) => {
  console.log("---> Petición recibida")
  console.log("Recurso soliticado (URL): " + req.url)

  var q = url.parse(req.url, true);

  console.log("Pathname: " + q.pathname)
  console.log("search:" + q.search)
  console.log("Busqueda:")
  var qdata = q.query
  console.log(qdata)

  console.log("Artículo: " + qdata.articulo)
  console.log("Color: " + qdata.color)

  var mime = "text/html"
  res.writeHead(200, {'Content-Type' : mime});

  var msg = `
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Mi tienda</title>
    </head>
    <body>
      <p> ¡BIENVENIDO A MI TIENDA! </p>
    </body>
  </html>
  `

  res.write(msg);
  res.end();
}).listen(8080);
