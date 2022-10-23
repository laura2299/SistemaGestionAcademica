//invocamos a express
const express= require('express');
const app = express();
//invocamos al motor de plantillas
app.set('view engine','ejs');

app.use('/',require('./router'));
//conexion en el puerto 5000 localhost
app.listen(5000,()=>{
    console.log('SERVER corriendo en http://localhost:5000');
});