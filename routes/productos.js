"use strict";
const express = require("express");
const { ORDER } = require("mysql/lib/PoolSelector");
//importamos las dependencias para el manejo de archivos
const cloudinary = require("cloudinary").v2;
// con util "promisificamos" el metodo de subida de archivos, como hicimos
// con pool.query , en definitiva, cloudinary tambien es una base de datos
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);
const router = express.Router();
const productsModel = require("../models/productsModel");

router.get("productos", async (req, res) => {
  const products = await productsModel.getProducts();
  const data = products.map((row) => {
    const imageURL = cloudinary.url(row.image, {
      width: 100,
      height: 100,
      crop: "fill",
    });
    return { ...row, imageURL };
  });

  res.render("productos", { data });
});
router.get("../routes/productos/addItem", (req, res) => {
  res.render("addItem");
});

// tenemos que enviar el archivo de imagen a cloudinary, cuando este subido, le pediremos
// a cloudinary que nos informe el id  de ese archivo. Ese id lo vamos almacenar en
//nuestra tabla junto al resto de los datos ingresados en el formulario

router.post("/addItem", async (req, res) => {
  //enviamos la imagen a cloudinary y obtenemos la URL
  let imageFile = req.files.imageFile;
  const img_id = (await uploader(imageFile.tempFilePath)).public_id;

  await productsModel.addProduct({ ...req.body, image: img_id }); //<=(newProducts)
  res.redirect("/");
});
//controlador que muestra un producto para editarlo o borrarlo, asi
// nos ahorramos la necesidad de hacer dos controladore y dos rutas distintas
//controlador para eliminar un registro, recibe un id por parametro
router.get("/handleEdit/:id", async (req, res) => {
  const row = await productsModel.getProduct(req.params.id);
  const product = {
    id: row[0].id,
    name: row[0].name,
    descripcion: row[0].descripcion,
    precio: row[0].precio,
    image: row[0].image,
  };
  res.render("editItem", { product });
});

router.post("/editProduct", async (req, res) => {
  let newImg = null;
  if (req.files) {
    //traemos el registro de la tabla porque necesitamos el campo image, que contiene el id
    //a través del cual identificamos las imágenes en cloudinary
    const row = await productsModel.getProduct(req.body.id);
    await destroy(row[0].image);
    const imageFile = req.files.imageFile;
    newImg = (await uploader(imageFile.tempFilePath)).public_id;
  }
  const data = {
    id: req.body.id,
    name: req.body.name,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    image: newImg || req.body.prevImage,
  };
  await productsModel.modifyProduct(data, data.id);
  res.redirect("/");
});

//controlador para eliminar un registro, recibe id por param
router.get("/deleteProduct/:id", async (req, res) => {
  //traemos el registro de la tabla porque necesitamos el campo image, que contiene el id
  //a través del cual identificamos las imágenes en cloudinary
  const row = await productsModel.getProduct(req.params.id);
  await destroy(row[0].image);
  await productsModel.deleteProduct(req.params.id);
  res.redirect("/");
});

module.exports = router;
