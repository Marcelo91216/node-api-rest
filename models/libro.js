const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const libroSchema = Schema({
    isbn: Number,
    titulo: String,
    autor: String,
    anio: Number,
    editorial: String
});

const Libro = mongoose.model('Libro', libroSchema);
module.exports = Libro;