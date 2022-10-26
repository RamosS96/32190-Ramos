class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [libros];
        this.mascotas = mascotas;
    };

    getFullName = () => {
        console.log(`Bienvenido ${this.nombre} ${this.apellido}`)
    }

    addMascota = (masc) => {
        this.mascotas.push(masc)
        console.log(`Se agregó ${masc} a la lista de mascotas`)
        console.log(`La lista de mascotas actuales es ${this.mascotas}`)
    }

    countMascotas = () => {
        console.log(`La cantidad de mascotas actuales es: ${this.mascotas.length}`)
    }

    getBooksName = () => {
        const nBooks = [];
        this.libros.map(d => nBooks.push(d.titulo))
        return console.log(nBooks)
    }
}

const user1 = new Usuario("Sebastian", "Ramos", {titulo: "Harry Potter 1", autor: "JK Rowling"}, ["Betun", "Cartucho", "Rosa"]);

user1.getFullName();
user1.addMascota("Roco");
user1.countMascotas();
user1.getBooksName();