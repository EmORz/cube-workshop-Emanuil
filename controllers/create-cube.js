const Cube = require('../models/cube')

const newCube = new Cube("Default", "nqkakvo opisanie da ima ne6to", "http://razgrad.bg", 1)
newCube.save()
console.log(newCube)