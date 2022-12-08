const fs = require('fs');
const express = require('express');
const txt = "./test.txt";
const { Router } = express

const app = express();
const routerproductos = Router();
const routercarrito = Router();
const admin = true;

//Configuración y vistas básicas
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('./pages/home.ejs')
});
app.get('/api', (req, res) => {
    admin == true ? res.render('./pages/cargaproductos.ejs') : res.render('./pages/error.ejs')
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Lectura y escritura
const readFile = (tx) => {
    const data = fs.readFileSync(tx, 'utf-8')
    const dataParsed = JSON.parse(data)
    return dataParsed
}
const writeFile = (tx, arr) => {
    const data = JSON.stringify(arr)
    fs.writeFileSync(tx, data, 'utf-8')
}
const productos = readFile(txt);

//Rutas vía Router()
routerproductos.get('/', (req, res) => {
    let items = productos
    res.render('./pages/listadoproductos.ejs', { item: items })
})
routerproductos.post('/', (req, res) => {
    if (admin == true) {
        const nuevoproducto = { ...req.body, id: productos.length + 1, alta: Date.now() }
        productos.push(nuevoproducto)
        let items = productos
        writeFile(txt, items);
        res.render('./pages/listadoproductos.ejs', { item: items })
    } else {
        res.render('./pages/error.ejs')
    }
})
routerproductos.get("/:id", (req, res) => {
    let id = req.params.id
    let resultado = productos.filter(el => el.id == id);
    let respuesta = (resultado.lenght > 0) ? resultado[0] : null

    res.json(respuesta)
})
routerproductos.put("/:id", (req, res) => {
    if (admin ==true) {
        let id = req.params.id;
    let body = req.body;
    let resultado = productos.find(el => el.id == id);
    let index = productos.indexOf(resultado);
    productos.splice(index, 1, { ...body, id: parseInt(id) })
    writeFile(txt, productos)
    res.json(`Se ha actualizado el id ${index + 1}`)
    } else {
        res.render('./pages/error.ejs')
    }
    
})
routerproductos.delete("/:id", (req, res) => {
    if (admin == true) {
        let id = req.params.id;
        let resultado = productos.find(el => el.id == id);
        let index = productos.indexOf(resultado);
        productos.splice(index, 1);
        writeFile(txt, productos)
        res.json("Se ha eliminado el producto: " + id)
    } else {
        res.render('./pages/error.ejs')
    }
})

//Carrito de compras


//Inicialización de servidor
app.use('/api/productos', routerproductos)
const server = app.listen(8080, () => {
    console.log('Servidor escuchando en el 8080')
})
