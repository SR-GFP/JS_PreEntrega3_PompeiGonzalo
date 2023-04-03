//---- VARIABLES-----//
let productosEnStock = [];
let carrito = [];

//-- Clase constructora para productosEnStock--//
class NuevoProducto {
    constructor(id, nombre, modelo, color, talle, cantidadStock) {
            this.id = id;
            this.nombre = nombre;
            this.modelo = modelo;
            this.color = color;
            this.talle = talle;
            this.cantidadStock = cantidadStock;
    }
}


//----------VINCULACION DE NODOS POR ID-----------//

const listaDeVariablesParaNodos = [
    // Variables para login y vistas
    btnLogin,
    ventanaEmergente,
    inputUsuario,
    inputPassword,
    btnIngresar,
    contenedorForm,
    btnCerrarLogin,
    formularioDeIngreso,
    contenedorHome,
    contenedorAdministrador,
    contenedorCarrito,
    //Variables de vista Administrador//
    btnAgregarProductoStock,
    vistaAgregarProducto,
    inputID,
    inputColor,
    inputNombre,
    inputModelo,
    inputTalle,
    inputCantidadStock,
    btnCargarProducto,
    btnCerrarForm,
]

/*  Function abstracta para vinvulacion de nodos
    Se agregan al array los nombres de las variables a vincular con los Nodos
    Nota: las variables y los nodos deben tener el mismo nombre de ID*/
const vincularNodos = (array) => {
    let i = document.querySelector("#i")
}
listaDeVariablesParaNodos.forEach(vincularNodos)



//-- FUNCION PARA INICIALIZAR LOS EVENTOS--//
function inicializarEventos() {
    formularioDeIngreso.onsubmit = (event) => validarIngreso(event);
    btnCerrarLogin.onclick = (event) => cerrarLogin(event);
    btnAgregarProductoStock.onclick = verFormularioAgregarProducto;
    formularioAgregarProducto.onsubmit = (event) => validarFormularioAgregarProducto(event);
    btnCerrarForm.onclick = cerrarForm;

}


/*-------------Log in ------------*/
btnLogin.onclick = function () {
    ventanaEmergente.className = "ventana__emergente__desbloqueada";
}

function cargarDatosAdministradorStorage() {
    localStorage.setItem("UsuarioAdmin", "Admin");
    localStorage.setItem("PasswordAdmin", "898989");
}
function obtenerDatosAdministradorStorage() {
    usuarioAdmin = localStorage.getItem("UsuarioAdmin");
    passwordAdmin = localStorage.getItem("PasswordAdmin");
}
function cerrarLogin(event) {
    event.preventDefault();
    formularioDeIngreso.reset();
    ventanaEmergente.className = "ventana__emergente__bloqueada"
}

function validarIngreso(event) {
    event.preventDefault();
    usuario = inputUsuario.value;
    password = inputPassword.value;
    obtenerDatosAdministradorStorage();

    if (usuario === usuarioAdmin && password === passwordAdmin) {
        contenedorHome.hidden = true;
        contenedorCarrito.hidden = true;
        Swal.fire({
            icon: 'success',
            text: 'Usted Ingreso como Administrador',
        })
        contenedorAdministrador.hidden = false;
    } else {
        contenedorHome.hidden = true;
        contenedorAdministrador.hidden = true;
        Swal.fire({
            icon: 'success',
            text: "Hola " + usuario,
        })
        contenedorCarrito.hidden = false;
    }
    formularioDeIngreso.reset();
    ventanaEmergente.className = "ventana__emergente__bloqueada";
}
function cerrarForm(event) {
    event.preventDefault();
    formularioAgregarProducto.reset();
    vistaAgregarProducto.hidden = true;
}
function verFormularioAgregarProducto(event) {
    vistaAgregarProducto.hidden = false;
}
function validarFormularioAgregarProducto(event) {
    event.preventDefault();
    let idProducto = inputID.value;
    let nombreProducto = inputNombre.value;
    let colorProducto = inputColor.value;
    let modeloProducto = inputModelo.valu;
    let talleProducto = inputTalle.value;
    let cantidadStockProducto = inputCantidadStock.value;

    // validar si el producto existe, si no cargarlo con clase
    const idExiste = productosEnStock.some((producto) => producto.id === idProducto);
    if (!idExiste) {
        let producto = new NuevoProducto(
            idProducto,
            nombreProducto,
            colorProducto,
            modeloProducto,
            talleProducto,
            cantidadStockProducto,
        );
        productosEnStock.push(producto)
        formularioAgregarProducto.reset();
        Swal.fire("Se agrego el producto correctamente")
    }
}
console.log(productosEnStock)


function main() {
    cargarDatosAdministradorStorage();
    inicializarEventos();
}

main()

