//---- VARIABLES-----//
let productosEnStock = [];
let carrito = [];

//-- Clase constructora para productosEnStock--//
class NuevoProducto {
    constructor(id, nombre, modelo, color, talle, cantidadStock, rutaImg) {
            this.id = id;
            this.nombre = nombre.toUpperCase();
            this.modelo = modelo.toUpperCase();
            this.color = color.toUpperCase();
            this.talle = talle;
            this.cantidadStock = cantidadStock;
            this.rutaImg = rutaImg;
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
    inputArchivo,
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

// validar Formulario para nuevo Producto
function validarFormularioAgregarProducto(event) {
    event.preventDefault();
    let idProducto = inputID.value;
    let nombreProducto = inputNombre.value;
    let colorProducto = inputColor.value;
    let modeloProducto = inputModelo.value;
    let talleProducto = inputTalle.value;
    let cantidadStockProducto = inputCantidadStock.value;
    let rutaArchivo = inputArchivo.value;

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
            rutaArchivo,
        );
        productosEnStock.push(producto)
        console.log(productosEnStock)
        formularioAgregarProducto.reset();
        Swal.fire("Se agrego el producto correctamente")
        pintarNuevoProducto();
    }else{
        Swal.fire("El ID de producto ya existe!")
    }
}
function pintarNuevoProducto(){
    contenedorNuevoProducto.innerHTML = "";
    let column = document.createElement("div");
    column.className= "col-md-12";
    column.id=`columna-${inputID.value}`;
    column.innerHTML=`
    <div class="card mb-3 ml-1" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${rutaArchivo.value}"
                alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <p class="card-text">ID: ${inputID.value} </p>
                <p class="card-text">Color: ${inputColor.value} </p>
                <p class="card-text">Nombre: ${inputNombre.value}</p>
                <p class="card-text">Modelo: ${inputModelo.value}</p>
                <p class="card-text">Talle: ${inputTalle.value}</p>
                <p class="card-text">Cantidad: ${inputCantidadStock.value}</p>
            </div>
        </div>
    </div>
    `
}

function main() {
    cargarDatosAdministradorStorage();
    inicializarEventos();
}

main()

