const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Permite que la API reciba información en formato JSON
app.use(express.json());

// Ruta principal para comprobar que el servidor funciona
app.get("/", (req, res) => {
    res.json({
        mensaje: "API REST funcionando correctamente"
    });
});

// Ruta para recibir datos de registro de usuario
app.post("/api/registro", (req, res) => {

    const usuario = req.body.usuario;
    const password = req.body.password;

    const datos = fs.readFileSync("usuarios.json", "utf8");
    const usuarios = JSON.parse(datos);

    usuarios.push({
    usuario: usuario,
    password: password
    });

    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));

    res.json({
        mensaje: "Usuario recibido correctamente"
    });

});

   // Ruta para recibir datos de inicio de sesión
   app.post("/api/login", (req, res) => {

    const usuario = req.body.usuario;
    const password = req.body.password;

    const datos = fs.readFileSync("usuarios.json", "utf8");
    const usuarios = JSON.parse(datos);

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    if (usuarioEncontrado && usuarioEncontrado.password === password) {
    res.json({
        mensaje: "Autenticación satisfactoria"
    });
    } else {
    res.status(401).json({
        error: "Error en la autenticación"
    });
}

});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});