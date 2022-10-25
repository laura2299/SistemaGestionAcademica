const conexion = require('../database/db');

exports.save =(req,res)=>{
    const nombre = req.body.nombre;
    const ap_paterno = req.body.ap_paterno;
    const ap_materno = req.body.ap_materno;
    const ci = req.body.ci;
    const matricula = req.body.matricula;
    conexion.query('INSERT INTO alumno SET ?',{nombre:nombre,ap_paterno:ap_paterno,ap_materno:ap_materno,ci:ci,matricula:matricula},
    (error,results)=>{
        if (error) {
            console.log(error);
        }else{
            res.redirect('/alumnos');
        }
    });
};
 exports.update =(req,res)=>
 {
    const id =req.body.id;
    const nombre = req.body.nombre;
    const ap_paterno = req.body.ap_paterno;
    const ap_materno = req.body.ap_materno;
    const ci = req.body.ci;
    const matricula = req.body.matricula;
    conexion.query('UPDATE alumno SET ? WHERE id =?',[{nombre:nombre,
    ap_paterno:ap_paterno,ap_materno:ap_materno,ci:ci,matricula:matricula},id],
    (error,results)=>{
        if (error) {
            console.log(error)
        } else {
            res.redirect('/alumnos');
        }
    });
 };

 exports.add =(req,res)=>
 {
    const idAlumno =req.body.idAlumno;
    const idMateria =req.body.idMateria;
    
    conexion.query('INSERT INTO alumno_materia SET ?',{idAlumno:idAlumno,idMateria:idMateria},
    (error,results)=>{
        if (error) {
            console.log(error);
        }else{
            res.redirect('/alumnos');
        }
    });
 };
