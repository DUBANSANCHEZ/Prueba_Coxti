const { match } = require('assert');
var express = require('express');
const { request } = require('http');
var db = require('../database');

const rangeofValuesCtrl = {};

rangeofValuesCtrl.getSalario = (req, res) => {
    let minSalario1,minSalario2,minSalario3,minSalario4,maxSalario1,maxSalario2,maxSalario3,maxSalario4;
    let primero = false;
    let segundo = false;
    let numeros = [];
    let numeroEnviar = [];
    let salario = parseInt(req.params.Salario);
    let minSalario = salario-(salario * 0.25);
    let maxSalario = salario+(salario * 0.25);        
    numeros[0] = {minSalario};
    numeros[1] = {maxSalario};
    for (let index = 0; index < 2; index++) {        
        let aleatorio = Math.random() * (10 - 1) + 1;
        let aleatorioOrdenado = Math.floor(aleatorio);
        console.log(aleatorioOrdenado,primero,segundo);
        if( aleatorioOrdenado >= 5){
            if(primero === false){
                maxSalario1 = maxSalario;
                maxSalario2 = maxSalario+(maxSalario * 0.25);
                primero = true;
                if (segundo === true) {
                    numeros[4] = {maxSalario1}
                    numeros[5] = {maxSalario2}
                }
                else{
                    numeros[2] = {maxSalario1}
                    numeros[3] = {maxSalario2}
                }
            }else{
                maxSalario3 = maxSalario1+(maxSalario1 * 0.25);
                maxSalario4 = maxSalario1+(maxSalario1 * 0.50);
                numeros[4] = {maxSalario3}
                numeros[5] = {maxSalario4}
            }            
        }else{
            if (segundo === false) {
                minSalario1 = minSalario;
                minSalario2 = minSalario-(minSalario * 0.25);
                segundo = true;
                if (primero === true) {
                    numeros[4] = {minSalario1}
                    numeros[5] = {minSalario2}
                } else {
                    numeros[2] = {minSalario1}
                    numeros[3] = {minSalario2}
                }
            }else{
                minSalario3 = minSalario1-(minSalario1 * 0.25);
                minSalario4 = minSalario1-(minSalario1 * 0.50);
                numeros[4] = {minSalario3}
                numeros[5] = {minSalario4}
            }            
        }
    }
    let aleatorio = Math.random() * (3 - 1) + 1;
    let aleatorioOrdenado = Math.floor(aleatorio);
    if (aleatorioOrdenado === 1) {
        numerosEnviar = numeros
    } else if (aleatorioOrdenado === 2) {
        numerosEnviar[0] = numeros[2];
        numerosEnviar[1] = numeros[3];
        numerosEnviar[2] = numeros[0];
        numerosEnviar[3] = numeros[1];
        numerosEnviar[4] = numeros[4];
        numerosEnviar[5] = numeros[5];
    } else {
        numerosEnviar[0] = numeros[4];
        numerosEnviar[1] = numeros[5];
        numerosEnviar[2] = numeros[2];
        numerosEnviar[3] = numeros[3];
        numerosEnviar[4] = numeros[0];
        numerosEnviar[5] = numeros[1];
    }
    res.json(numerosEnviar);
}
module.exports = rangeofValuesCtrl;