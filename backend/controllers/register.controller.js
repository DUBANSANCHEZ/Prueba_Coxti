var express = require('express');
const { request } = require('http');
var db = require('../database');
var bcrypt = require('bcryptjs');

const registerCtrl = {};

registerCtrl.getRegister = (req, res) => {
    db.query(`SELECT * FROM Persona`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda de Personas" + err);
        } else {
            res.json(data);
        }
    });
}
registerCtrl.getRegisterByIdPersona = (req, res) => { 
    let id = req.params.Id_persona;
    db.query(`SELECT * FROM Persona WHERE Id_persona='${id}'`, (err, data) => {
        if (err) {
            res.json({ error: err });
            console.log("Hubo un error en la busqueda del Persona" + err);
        } else {
            res.json(data);
        }
    });
}
registerCtrl.createRegisterPersona = (req, res) => { 
    usuarios = req.body;
    bcrypt.hash(usuarios.Password,10,function(err,data){
        if(data){
            usuarios.Password=data;          
        }else{
            console.log("Hubo un error ENCRIPTANDOCLAVE" + err);
        }  
        var query = `INSERT INTO Persona (Nombre,Apellido,Cedula,Celular,Correo,Recovery,Password,Departamento,Ciudad,Barrio,Direccion,Salario,Otros_ingresos,Gastos_mensuales,Gastos_financieros)
        VALUES ('${usuarios.Nombre}','${usuarios.Apellido}','${usuarios.Cedula}','${usuarios.Celular}','${usuarios.Correo}','${usuarios.Recovery}','${usuarios.Password}','${usuarios.Departamento}','${usuarios.Ciudad}','${usuarios.Barrio}','${usuarios.Direccion}','${usuarios.Salario}','${usuarios.otros_Ingresos}','${usuarios.Gastos_mensuales}','${usuarios.Gastos_Financieros}')`;
        db.query(query, function(err, data) {
            if (err) {
                res.json({ error: err });
                console.log("Hubo un error INSERTANDO USUARIO" + err);
            } else {
                res.json(data);
            }
        });             
    });    
}
registerCtrl.usuarioDuplicado = (req, res) => {
    var query = `SELECT COUNT(*) AS duplicate from Persona where Cedula='${req.body.Cedula}'`;
    var query2 = `SELECT COUNT(*) AS duplicate from Persona where Celular='${req.body.Celular}'`;
    var query3 = `SELECT COUNT(*) AS duplicate from Persona where Correo='${req.body.Correo}'`;
    db.query(query, function(err, data) {
        if (err) res.json({ error: err });
        else{
            if(data[0].DUPLICATE === 1) res.json({ fail: 1 });
            else{
                db.query(query2, function(err, data) {
                    if (err) res.json({ error: err });
                    else 
                    {
                        if(data[0].DUPLICATE === 1) res.json({ fail: 2 });
                        else{
                            db.query(query3, function(err, data){
                                if (err) res.json({ error: err });
                                else 
                                {
                                    if(data[0].DUPLICATE === 1) res.json({ fail: 3 });
                                    else res.json({ fail: 0 })
                                }
                            })
                        }                           
                    }                
                });   
            }          
        }
    }); 
}
module.exports = registerCtrl;