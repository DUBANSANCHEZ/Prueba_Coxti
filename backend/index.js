const express = require ('express');
const app = express();


app.use(express.json());

const libs = require('./libs');
libs.forEach(lib => require(`./libs/${lib}`)(app));