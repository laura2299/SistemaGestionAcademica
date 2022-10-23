const express = require('express');
const router = express.Router();

const conexion=require('./database/db');
//principal
router.get('/',(req,res)=>{ 
        res.render('index.ejs');
 
});
//mostrar todos los registros
router.get('/alumnos',(req,res)=>{
    
    conexion.query('SELECT * FROM alumno',(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('alumno/index.ejs',{results:results});
        }
    })
    
});
//ruta par crear alumnos
router.get('/alumno/create',(req,res)=>{
    res.render('alumno/create.ejs');
});
const alumno_crud = require('./controllers/alumnoController');
router.post('/alumno/save',alumno_crud.save);
router.post('/alumno/update',alumno_crud.update);

//ruta para editar alumnos
router.get('/alumno/edit/:id',(req,res)=>{
    const id =req.params.id;
    conexion.query('SELECT * FROM alumno WHERE id=?',[id],(error,results)=>
    {
        if (error) {
            throw error;
        } else {
            res.render('alumno/edit',{alumno:results[0]})
        }
    })
    
});
//ruta para eliminar alumnos
router.get('/alumno/delete/:id',(req,res)=>
{   const id = req.params.id;
    conexion.query('DELETE FROM alumno WHERE id =?',[id],(error,results)=>{
        if (error) {
            throw error;
        } else {
            res.redirect('/alumnos')
        }
    })
})
module.exports=router;