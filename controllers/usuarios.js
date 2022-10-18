const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { q,nombre = 'No name',apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'Peticion get a mi API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
};

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'Peticion post a mi API - controlador',
        nombre, 
        edad
    })
};

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'Peticion put a mi API - controlador',
        id
    })
};

const usuariosPatch = (req, res = response) => {

    res.status(500).json({
        msg: 'Peticion patch a mi API - controlador'
    })
};

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'Peticion delete a mi API - controlador'
    })
};




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}