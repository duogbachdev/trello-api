import express from 'express'
// const express = require('express')


const app = express()

const hostname = 'localhost'
const port = 8080

app.get('/', function (req, res) {
    res.send('<h1>Hello World DuogBachDev</h1>')
})

app.listen(port, hostname, () => {
    console.log(`Hello DuogBachDev, I'm running server at http://${hostname}:${port}/`);
})