const conexion = require('../database/db');
exports.save=(req,res)=>{
    const nombre=req.body.nombre;
    const semestre=req.body.semestre;
    conexion.query('INSERT INTO materia SET ?', {nombre:nombre, semestre:semestre}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/materias');
        }
    })

};

exports.update=(req,res)=>{
    const id=req.body.id;
    const nombre=req.body.nombre;
    const semestre=req.body.semestre;
    conexion.query('UPDATE materia SET ? WHERE id=?', [{nombre:nombre,semestre:semestre}, id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/materias');
        }
    })

};