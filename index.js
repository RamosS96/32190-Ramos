const fs = require('fs');
const txt = "./test.txt";


class Contenedor {
    constructor (archivo){
        this.archivo = archivo
    };

    save(obj) {
            try {
                const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
                newItem = {...obj, id: data.length+1}
                data.push(newItem)
                fs.writeFileSync(this.archivo, JSON.stringify(data))
                console.log(`Se ha guardado el item bajo el id: ${newItem.id}`)
            } catch (error) {
                    console.error(`Ocurrio un error al guardar el item ${error}`)
            }
            
        
    }

    getByNumber (id) {
        try {
            const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
            console.log(data.find( el => el.id == id))
        }
        catch (error) {
            console.error("Ocurrio un error al obtener el ID seleccionado o el mismo no fue encontrado")
        }
    }

    getAll (){
        try {
            const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
            console.log(data)
        } 
        catch (error) {
            console.error("Ocurrio un error al obtener la lista de items")
        }
        
    }

    deleteByID(id){
        try {
            const data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
            const index = data.findIndex(el => el.id == id)
            data.splice(index,1)
            fs.writeFileSync(this.archivo, JSON.stringify(data))
            console.log(`Se ha borrado el registro nro ${index + 1 }`)
        }
        catch (error) {
            console.error("Ocurrio un error al borrar el item seleccionado")
        }
            
    }

    deleteAll () {
        try {
            var data = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
            data = []
            fs.writeFileSync(this.archivo, JSON.stringify(data))
            console.log("Se han borrado todos los registros")
        }
        catch (error) {
            console.error("Ocurrio un error al borrar todos los items")
        }
        
    }
}

const archivos = new Contenedor(txt)
archivos.getAll();
archivos.getByNumber();