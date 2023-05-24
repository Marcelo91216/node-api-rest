const express = require('express');
const router = express.Router();

const Libro = require('../models/libro');

// Obtener todos los documentos directamente de la base de datos
router.get('/', async(req, res)=>{
    try{
        const arrayLibrosDB = await Libro.find();
        // console.log(`${arrayLibrosDB}`);
        res.json(arrayLibrosDB);
    }catch(error){
        console.log(error);
    }
});

// Para obtener un solo libro
router.get('/:id', async(req, res)=>{
    const id = req.params.id;
    try{
        const arrayLibrosDB = await Libro.find({isbn: id});
        res.json(arrayLibrosDB);
    }catch(error){
        console.log(error);
    }
});

// Para insertar un documento en la DB de mongo 
router.post('/', async(req, res)=>{
    const body = req.body;
    try{
        await Libro.create(body);
        res.json({estado: 'Libro insertado exitosamente'});
    }catch(err){
        console.log(err);
        res.send(404);
    }
});

// Para eliminar un documento en la DB de mongo
router.delete('/:id', async(req, res)=>{
    const id = req.params.id;
    try{
        const libroDB = await Libro.findOneAndDelete({isbn: id});
        if(libroDB){
            res.json({
                estado: true,
                mensaje: 'libro eliminado'
            });
        }
        else{
            res.json({
                estado: false,
                mensaje: 'No se encontro el libro solicitado'
            });
        }
    }catch(error){
        console.log(error);
        res.send(404);
    }
});

// Actualizar un libro
router.put('/:id', async(req, res)=>{
   const id = req.params.id;
   try{
        const libroDB = await Libro.findOneAndUpdate({isbn: id}, req.body, {useFindAndModify: false});
        res.json({
            estado: true,
            mensaje: "Se actualizó la información correctamente"
        });
   }catch(error){
        console.log(error);
        res.json({
            estado: false,
            mensaje: "Los datos del libro no fueron actualizados"
        });
   } 
});

module.exports=router;