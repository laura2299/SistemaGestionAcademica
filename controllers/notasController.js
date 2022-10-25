const conexion = require('../database/db');
exports.addnota=(req,res)=>{
    const idAlumno=req.body.idAlumno;
    const idMateria=req.body.idMateria;
    const nota=req.body.nota;
    const gestion=req.body.gestion;
    conexion.query('INSERT INTO notas SET ?', {idAlumno:idAlumno,idMateria:idMateria ,nota:nota,gestion:gestion}, (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/notas');
        }
    })

};
 