const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"fegs-soft-react"
});

app.post("/create",(req,res)=>{
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo;
    const Usuario = req.body.Usuario;
    const Clave = req.body.Clave;
    const Rol = req.body.Rol;
    const Imagen = req.body.Imagen;
    console.log(Imagen)
    db.query('INSERT INTO usuarios(Nombre,Correo,Usuario,Clave,Rol,Imagen) VALUES(?,?,?,?,?,?)',[Nombre,Correo,Usuario,Clave,Rol,Imagen],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE Correo = ? AND Clave = ?',
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error en el servidor");
      } else {
        if (result.length > 0) {
          res.status(200).send("Inicio de sesion exitoso");
        } else {
          res.status(401).send("Credenciales invalidas");
        }
      }
    }

  )
})


app.get("/usuarios",(req,res)=>{
    db.query('SELECT * FROM usuarios',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo;
    const Usuario = req.body.Usuario;
    const Rol = req.body.Rol;
  
    db.query(
      'UPDATE usuarios SET Nombre=?, Correo=?, Usuario=?, Rol=? WHERE id=?',
      [Nombre, Correo, Usuario, Rol, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar el usuario");
        } else {
          res.send(result);
        }
      }
    );
  });

  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
  
    db.query(
      'DELETE FROM usuarios WHERE id=?',id,
      (err,result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });


app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})