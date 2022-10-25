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
//mostrar todas las materias
router.get('/materias',(req,res)=>{
    
    conexion.query('SELECT * FROM materia',(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('materia/index.ejs',{results:results});
        }
    })
    
});
//mostrar las notas por alumnos:
router.get('/notas',(req,res)=>{
    
    conexion.query('SELECT * FROM alumno',(error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('notas/index.ejs',{results:results});
        }
    })
    
});
//RUTA PARA CREAR REGISTROS DE MATERIA
router.get('/materia/create', (req,res)=>{
    res.render('materia/create');
});

//ruta par crear alumnos
router.get('/alumno/create',(req,res)=>{
    res.render('alumno/create.ejs');
});

const alumno_crud = require('./controllers/alumnoController');
router.post('/alumno/save',alumno_crud.save);
router.post('/alumno/update',alumno_crud.update);
router.post('/materia/add',alumno_crud.add);

const materiaController=require('./controllers/materiaController');
const { Router } = require('express');
router.post('/materia/save',materiaController.save);
router.post('/materia/update',materiaController.update);

const notaController=require('./controllers/notasController');
router.post('/nota/add',notaController.addnota);

//para ver notas de alumno
router.get('/alumno/notas/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT p.id,p.nota,p.gestion,m.nombre,a.ci FROM notas p,alumno a,materia m WHERE p.idAlumno =? AND p.idAlumno=a.id AND m.id=p.idMateria ORDER BY(id);',
    [id],(error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('notas/show.ejs',{results:results});
        }
    })
});
//para ver materias que esta inscrito alumno
router.get('/alumno/materias/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT m.* FROM alumno a,materia m,alumno_materia am WHERE am.idAlumno=a.id AND am.idMateria=m.id AND a.id=?',
    [id],(error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('alumno/materias.ejs',{results:results,idAlumno:id});
        }
    })
});
//para añadir materias al alumno
router.get('/alumno/anadir/materia/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT * FROM materia',(error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('alumno/materiasAdd.ejs',{results:results,idA:id});
        }
    })
});

//para añadir notas al alumno
router.get('/alumno/agregar/notas/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT m.id,m.nombre FROM alumno_materia an,materia m WHERE idAlumno = ? AND m.id=an.idMateria',[id],(error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('notas/notasAdd.ejs',{results:results,idA:id});
        }
    })
});

//RUTA PARA EDITAR REGISTROS DE MATERIA
router.get('/materia/edit/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('SELECT*FROM materia WHERE id=?',[id],(error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('materia/edit.ejs', {nombre:results[0]});
        }
    })
})
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
//ruta para editar alumnos
router.get('/nota/edit/:id',(req,res)=>{
    const id =req.params.id;
    conexion.query('SELECT * FROM notas WHERE id=?',[id],(error,results)=>
    {
        if (error) {
            throw error;
        } else {
            res.render('notas/edit',{nota:results[0]})
        }
    })
    
});

//RUTA PARA ELIMINAR REGISTRO DE MATERIA
router.get('/materia/delete/:id', (req,res)=>{
    const id=req.params.id;
    conexion.query('DELETE FROM materia WHERE id=?',[id],(error, results)=>{

        if (error) {
            throw error;
        }else{
            res.redirect('/materia')
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
});

//ruta para eliminar nota
router.get('/nota/delete/:id',(req,res)=>
{   const id = req.params.id;
    conexion.query('DELETE FROM notas WHERE id =?',[id],(error,results)=>{
        if (error) {
            throw error;
        } else {
            res.redirect('/notas')
        }
    })
});

//RUTA PARA ELIMINAR RElacion materia y alumno
router.get('/alumno/materia/delete/:idMateria/:idAlumno', (req,res)=>{
    const idMateria=req.params.idMateria;
    const idAlumno=req.params.idAlumno;
    conexion.query('DELETE FROM alumno_materia WHERE idMateria=? AND idAlumno=?',[idMateria,idAlumno],(error, results)=>{

        if (error) {
            throw error;
        }else{
            res.redirect('/alumnos')
        }
    })
});
module.exports=router;