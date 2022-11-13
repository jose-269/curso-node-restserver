const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    // const { q,nombre = 'No name',apikey, page = 1, limit } = req.query;
    const { limite = 5, desde=0 } = req.query;
    const query = { estado: true};

    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
        // total,
        // usuarios


        // msg: 'Peticion get a mi API - controlador',
        // q,
        // nombre,
        // apikey,
        // page,
        // limit
    })
};

const usuariosPost = async (req, res = response) => {

    const  { nombre, correo, password, rol }  = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Verificar si el correo existe

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )
    // Guardar en DB

    await usuario.save();

    res.status(201).json({
        usuario
    })
};

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra BD
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario)
};

const usuariosPatch = (req, res = response) => {

    res.status(500).json({
        msg: 'Peticion patch a mi API - controlador'
    })
};

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo Borro
    // const usuario = await Usuario.findByIdAndDelete( id );

    //Cambiar estado de usuario
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )

    res.json({
        // msg: 'Peticion delete a mi API - controlador'
        usuario
    })
};




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}