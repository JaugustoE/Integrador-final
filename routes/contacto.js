"use strict";
require("dotenv").config();
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const nodemailer = require("nodemailer");

//get
router.get("/", (req, res) => {
  res.render("contacto");
});

const validationRules = [
  body("name", "Debe ingresar su nombre").exists().isLength({ min: 2 }),
  body("lastName", "Debe ingresar su apellido").exists().isLength({ min: 2 }),
  body("email", "Debe ingresar un email valido").exists().isEmail(),
  body("message", "Su mensaje debe contener entre 10 y 300 caracteres")
    .exists()
    .trim()
    .isLength({ min: 10, max: 300 }),
];

/*POST*/
router.post("/", validationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formData = req.section;
    const arrWarnings = errors.array();
    res.render("contacto", { formData, arrWarnings });
  } else {
    const emailMsg = {
      to: "atencioncliente@empresa.com",
      from: req.body.email,
      subject: "Mensaje desde formulario de contacto",
      html: `${req.body.name} ${req.body.lastName} envio el siguiente mensaje: ${req.body.message}`,
    };

    const transport = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    let sendMailStatus = await transport.sendMail(emailMsg);
    let statusMessage = "";
    if (sendMailStatus.rejected.length) {
      statusMessage = "No pudimos enviar. Intente de nuevo";
    } else {
      statusMessage = "Mensaje enviado";
    }
    res.render("contacto", { statusMessage });
  }
});

module.exports = router;
