const express = require('express');
const router = express.Router();

const conexion=require('./database/db');

router.get('/',(req,res)=>{
    res.render('alumno/index.ejs',{var1:'Esto es variable'})
    /*conexion.query('SELECT * FROM alumno',(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    })
    */
});
router.get('/contacto',(req,res)=>{
    res.send('contacto');
});

module.exports=router;