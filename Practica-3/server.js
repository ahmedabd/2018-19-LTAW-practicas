var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...")


cookies_compra = ""
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
      }else {
        content += "\nEstás registrado\n"
      }
      res.statusCode = 200;
    }else if(q.pathname == "/buscar.html"){
      if (req.method === 'POST') {
        req.on('data', chunk => {
        data = chunk.toString();
        console.log(data);
        data = data.split("=")[1];
        console.log("DATOS BUSCAR ---->", data);
        content += buscarProductos(data);
        console.log("DATAAAA ENCONTRADO------>", data);
        console.log("Datos recibidos: " + data);
        res.statusCode = 200;
      });
        req.on('end', ()=> {
        res.setHeader('Content-Type', 'text/html');
        res.write(content);
        res.end();
            })
            return
          }
    }else if(q.pathname == "/cookie_guitar_1"){
      if (!cookie) {
        content += "Tienes que registrarte, pulsa el botón ingresar en la página principal"
        content += `
          <a href="/">[Página principal]</a>
        `
        file_name = "guitarras.html"
      }else{
        content += "Añadido el producto a la compra ✓"
        content += `
          <a href="/">[Página principal]</a>
        `
        file_name = "guitarras.html"
        cookies_compra += "Guitarra_1 "
        res.setHeader('Set-Cookie', cookies_compra);
      }
    }else if(q.pathname == "/cookie_guitar_2"){
        if (!cookie) {
          content += "Tienes que registrarte, pulsa el botón ingresar en la página principal"
          content += `
            <a href="/">[Página principal]</a>
          `
          file_name = "guitarras.html"
        }else{
          content += "Añadido el producto a la compra ✓"
          content += `
            <a href="/">[Página principal]</a>
          `
          file_name = "guitarras.html"
          cookies_compra += "Guitarra_2 "
          res.setHeader('Set-Cookie', cookies_compra);
        }
    }else if(q.pathname == "/cookie_bateria_1"){
      if (!cookie) {
        content += "Tienes que registrarte, pulsa el botón ingresar en la página principal"
        content += `
          <a href="/">[Página principal]</a>
        `
        file_name = "baterias.html"
      }else{
        content += "Añadido el producto a la compra ✓"
        content += `
          <a href="/">[Página principal]</a>
        `
        cookies_compra +="Bateria_1 "
        file_name = "baterias.html"
        res.setHeader('Set-Cookie', cookies_compra)
      }
    }else if(q.pathname == "/cookie_bateria_2"){
      if (!cookie) {
        content += "Tienes que registrarte, pulsa el botón ingresar en la página principal"
        content += `
          <a href="/">[Página principal]</a>
        `
        file_name = "baterias.html"
      }else{
        content += "Añadido el producto a la compra ✓"
        content += `
          <a href="/">[Página principal]</a>
        `
        file_name = "baterias.html"
        cookies_compra += "Bateria_2 "
        res.setHeader('Set-Cookie', cookies_compra);
      }
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

    cookies_user = Math.floor(Math.random()*101)
    if(file_name == "login.html"){
      res.setHeader('Set-Cookie', cookies_user)
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
          if (cookie = cookies_compra){
            content += "\nHas comprado los siguientes productos: \n" + cookies_compra;
          }
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

function buscarProductos(data){
  var html = "<br>Productos: <br><ul>";
  productos = `
  {
    "productos": ["Guitarra_1", "Guitarra_2", "Bateria_1", "Bateria_2"]
  }
  `
  var encontrado = false;
  var o = JSON.parse(productos);
    for (i=0; i < o.productos.length; i++) {
      if (o.productos[i].toString().includes(data)) {
        html += "<li>" + o.productos[i];
        encontrado = true;
      }
    }
    if (!encontrado) {
      html += '</ul>No se han encontrado resultados.';
    }
  return html;
}
