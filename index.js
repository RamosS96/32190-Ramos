const fs = require('fs');
const express = require('express');
const txt = "./test.txt";
const { Router } = express

const app = express()
const router = Router()

app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('./pages/home.ejs')
});
app.get('/api', (req, res) => {
    res.render('./pages/cargaproductos.ejs')
    
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use('/', express.static('public'))
const productos = [];

router.get('/', (req,res) => {
    let items = productos
    res.render('./pages/listadoproductos.ejs', {item: items})
})

router.post('/', (req, res) => {
    const nuevoproducto =  {...req.body, id: productos.length + 1}

    productos.push(nuevoproducto)
    let items = productos
    res.render('./pages/listadoproductos.ejs', {item: items})
})

router.get("/:id", (req, res) => {
    let id = req.params.id
    let resultado = productos.filter(el => el.id == id);
    let respuesta = (resultado.lenght > 0) ? resultado[0] : null

    res.json(respuesta)
})

router.put("/:id", (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let resultado = productos.find(el => el.id == id);
    let index = productos.indexOf(resultado);

    productos.splice(index, 1, {...body, id: parseInt(id)})

    res.json(`Se ha actualizado el id ${index + 1}: ${body}`)
})

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    let resultado = productos.find(el => el.id == id);
    let index = productos.indexOf(resultado);
    productos.splice(index, 1)
    res.json("Se ha eliminado el producto: " + id)
})

app.use('/api/productos', router)
const server = app.listen(8080, () => {
    console.log('Servidor escuchando en el 8080')
})
