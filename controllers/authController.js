const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.autenticarUsuarios = async (req, res) =>{
    // revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array() });
    }

    // extraer el email y password del reques
    const { email , password } = req.body;

    try {
        // revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        // Revisar si el password es valido
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'});
        }

        // si todo es correcto creamos el JWT
        // crear y firmar le JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        }
        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600 // 1 hora
        }, (error, token)=>{
            if(error) throw error;
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}

// Obtiene que usuario esta autenticado

exports.usuarioAutenticado = async (req, res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}