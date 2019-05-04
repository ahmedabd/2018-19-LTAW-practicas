var http = require('http');
var url = require('url');
var fs = require('fs');
var cookies = 0;

console.log("Arrancando servidor...")


http.createServer((req,res) => {
  console.log("---> Petición recibida")
  console.log("Recurso soliticado (URL): " + req.url)

  var q = url.parse(req.url, true);
  console.log("Pathname: " + q.pathname)

  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  var content= ""

  var file_name = ""
    if (q.pathname == "/"){
      file_name = "index.html"
      if (!cookie) {
        content += "\nTienes que registrarte, pulsa el botón ingresar\n"

      //-- Hay definida una Cookie.
      } else {
        content += cookies;
      }
      res.statusCode = 200;
    }else{
      file_name = q.pathname.split("/")[1];
    }

    type_file = file_name.split(".")[1];


  fs.readFile(file_name, function(err, data){
    if (err){
      res.writeHead(404, {'Content_Type': 'text/html'});
      return res.end("404 Not Found");
    }

    mime = "text/html"
    if (type_file == 'png' || type_file == 'png'){
      mime = "image/" + type_file
    }else if (type_file == "css"){
      mime = "text/css"
    };

    cookies = Math.floor(Math.random()*101)
    if(file_name == "login.html"){
      res.setHeader('Set-Cookie', cookies)
    }else if (file_name == "form_ok.html"){
      if (req.method === 'POST'){
        req.on('data', chunk => {
          data = chunk.toString();
          content += data;
          content += `
                </p>
                <a href="form.html">[Formulario]</a>
              </body>
            </html>
            `
          console.log("Datos recibidios: " + data)
          res.statusCode = 200;
        });
        req.on('end', ()=>{
          res.setHeader('Content_Type', 'text/html')
          res.write(content);
          res.end();
        })
        return
      }
    }



    res.write(data);
    res.write(content);
    console.log("Peticion atendida");
    console.log();
    return res.end();
  });
}).listen(8080);
