var express = require('express');
var db = require('../database');
var bcrypt = require('bcryptjs');
var config = require('../models/config');
var jwt = require('jsonwebtoken');

const loginCtrl = {};

loginCtrl.logout = (req, res) => {
    res.status(200).send({ auth: false, token: null });
}

loginCtrl.authentication = (req, res) => {
    db.query(`SELECT * FROM Persona WHERE Correo = '${req.body.Correo}'`, (err, data) => {
        if (err) { 
            res.send('Ocurrio un error en la busqueda' + err) 
        } 
        else {
            if (data.length === 0) {
                res.json({ fail: 1 });
            } else if (bcrypt.compareSync(req.body.Password, data[0].PASSWORD) != 1) {
                res.json({ fail: 2 });
            } else {
                id_persona = data[0].ID_PERSONA;
                cedula = data[0].CEDULA;
                nombre = data[0].NOMBRE;     
                token = jwt.sign({id_persona, cedula, nombre},config.secret, { expiresIn: 86400 })
                res.json({ auth: true, token: token })     
            }
        }
    });
}

module.exports = loginCtrl;