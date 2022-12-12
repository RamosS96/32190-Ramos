const fs = require('fs');
const express = require('express');
const productlist = "./productos.txt";
const cartlist = "./carritos.txt";
const { Router } = express

const app = express();
const routerproductos = Router();
const routercarritos = Router();
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
const productos = readFile(productlist);
const carritos = readFile(cartlist);

//Rutas vía Router()
routerproductos.get('/', (req, res) => {
    let items = productos
    res.json(items)
})
routerproductos.post('/', (req, res) => {
    if (admin == true) {
        const nuevoproducto = { ...req.body, id: productos.length + 1, alta: Date.now() }
        productos.push(nuevoproducto)
        let items = productos
        writeFile(productlist, items);
        res.json(items)
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
    if (admin == true) {
        let id = req.params.id;
        let body = req.body;
        let resultado = productos.find(el => el.id == id);
        let index = productos.indexOf(resultado);
        productos.splice(index, 1, { ...body, id: parseInt(id) })
        writeFile(productlist, productos)
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
        writeFile(productlist, productos)
        res.json("Se ha eliminado el producto: " + id)
    } else {
        res.render('./pages/error.ejs')
    }
})

//Carrito de compras
routercarritos.get('/', (req, res) => {
    res.json(carritos)
})
routercarritos.get("/:id", (req, res) => {
    let id = req.params.id;
    let resultado = carritos.filter(el => el.id == id);
    res.json(resultado[0])
})
routercarritos.post('/', (req, res) => {
    if (admin == true) {
        const nuevocarrito = { ...req.body, id: carritos.length + 1, timestamp: Date.now() }
        carritos.push(nuevocarrito)
        writeFile(cartlist, carritos);
        res.json(carritos)
    } else {
        res.render('./pages/error.ejs')
    }
})


//Inicialización de servidor
app.use('/api/productos', routerproductos)
app.use('/api/carritos', routercarritos)
const server = app.listen(8080, () => {
    console.log('Servidor escuchando en el 8080')
})
