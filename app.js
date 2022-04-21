"use strict";
const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const fileupload = require("express-fileupload");
const hbs = require("hbs");
const app = express();
const PORT = 3001;

app.use(express.json());

// configuracion de express- fileupload
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//declaramos la ruta de nuestro contenido estatico (carpeta "public")
// habilitamos la lectura de datos en campos del formulario
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

//Enrutadores
const routeIndex = require("./routes/index");
const routeLogin = require("./routes/login");
const routeSecret = require("./routes/secret");
const routeContacto = require("./routes/contacto");
const routeProductos = require("./routes/productos");

// establecer el motor de plantillas
app.set("view engine", "hbs");
//registramos el directorio para los parciales
hbs.registerPartials(path.join(__dirname, "./views/partials"));
app.set("views", path.join(__dirname, "views"));

//configuramos expres-session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// middleware de verificacion de los intentos de ingreso a la ruta "secret"
const secured = async (req, res, next) => {
  if (req.session.user) {
    app.locals.user = req.session.user;
    next();
  } else {
    const message = "Debe ingresar primero";
    res.render("login", { message });
  }
};
const isAuth = (req, res, next) => {
  app.locals.loggedUser = req.session.user;
  next();
};

// uso de rutas
app.use("/", routeIndex);
app.use("/", isAuth, routeIndex);
app.use("/login", routeLogin);
app.use("/contacto", routeContacto);
app.use("/productos", routeProductos);
app.use("/secret", secured, routeSecret);

app.get("*", (req, res) => {
  res.send("error");
});

// lanzamos nuestra app en localhost
app.listen(PORT, (err) => {
  err
    ? console.log("error")
    : console.warn(`Servidor corriendo en http://localhost:${PORT}/`);
});
