const fs = require('fs');
const txt = "./test.txt";


class Contenedor {
    constructor (archivo){
        this.archivo = archivo
    };

    save(obj) {
            const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
            data.push({...obj, id: data.length+1})
            fs.writeFileSync(this.archivo, JSON.stringify(data))
            console.log(data)
        
    }

    getByNumber (id) {
        const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
        console.log(data.find( el => el.id == id))
    }

    getAll (){
        const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
        console.log(data)
    }

    deleteByID(id){
        const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
        const index = data.findIndex(el => el.id == id)
        data.splice(index,1)
        fs.writeFileSync(this.archivo, JSON.stringify(data))
        console.log(`Se ha borrado el registro nro ${index + 1 }`)    
    }

    deleteAll () {
        var data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
        data = []
        fs.writeFileSync(this.archivo, JSON.stringify(data))
        console.log("Se han borrado todos los registros")
    }
}

const archivos = new Contenedor(txt)
archivos.getAll();