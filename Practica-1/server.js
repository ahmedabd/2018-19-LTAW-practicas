var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...")


http.createServer((req,res) => {
  console.log("---> Petición recibida")
  console.log("Recurso soliticado (URL): " + req.url)

  var q = url.parse(req.url, true);
  console.log("Pathname: " + q.pathname)

  var file_name = ""
    if (q.pathname == "/"){
      file_name = "index.html"
    }else{
      file_name = q.pathname.split("/")[1];
    }

    type_file = file_name.split(".")[1];

    console.log(file_name);


  fs.readFile(file_name, function(err, data){
    if (err){
      res.writeHead(404, {'Content_Type': 'text/html'});
      return res.end("404 Not Found");
    }

    mime = "text/html"
    console.log(type_file);
    if (type_file == 'png' || type_file == 'png'){
      mime = "image/" + type_file
    }else if (type_file == "css"){
      mime = "text/css"
    };
    res.write(data);
    console.log("Peticion atendida");
    console.log();
    return res.end();
  });
}).listen(8080);
