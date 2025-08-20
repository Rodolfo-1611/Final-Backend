const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    database:"pokemones_crud"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const nivel = req.body.nivel;
    const ataqueBasico = req.body.ataqueBasico;
    const ataqueCargado = req.body.ataqueCargado;

    db.query("INSERT INTO pokemon(nombre,tipo,nivel,ataque_basico,ataque_cargado) VALUES(?,?,?,?,?)",[nombre,tipo,nivel,ataqueBasico,ataqueCargado],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Pokemon registrado con éxito!!");
            }
        }
    );
});

app.get("/pokemones",(req,res)=>{

    db.query("SELECT * FROM pokemon ORDER BY id DESC",
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const nivel = req.body.nivel;
    const ataqueBasico = req.body.ataqueBasico;
    const ataqueCargado = req.body.ataqueCargado;

    db.query("UPDATE pokemon SET nombre=?,tipo=?,nivel=?,ataque_basico=?,ataque_cargado=? WHERE id=?",[nombre,tipo,nivel,ataqueBasico,ataqueCargado,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Pokemon actualizado exitosamente!!");
            }
        }
    );
});

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM pokemon WHERE id=?",id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.listen(3001,()=>{
    console.log("Proyecto corriendo en el puerto 3001 :D")
})